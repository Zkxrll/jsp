// Key-gated script delivery for the Zkx Hub loader.
//   Roblox  --POST {g: GameId, k: key}-->  this route  --checks the key with Junkie-->  --fetches the file from the PRIVATE script repo-->  text back
// Secrets exist ONLY as Vercel environment variables (never in this repo, which is public):
//   JUNKIE_API_KEY    Junkie dashboard API key (scope rest-api:*)
//   GH_SCRIPT_TOKEN   fine-grained GitHub token, read-only "Contents" on the script repo
//   GH_SCRIPT_REPO    optional, default "Zkxrll/mmh"       GH_SCRIPT_BRANCH  optional, default "main"
//   ALLOW_KEYLESS     optional, "1" lets the literal key KEYLESS through (only if the Junkie service is keyless)
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const FILES: Record<string, string> = {
  '6035872082': 'R1V4LZ',
  '7264587281': '5N1P3RDU3LZ',
  '10563114921': '5T34L4N3GG',
}
const JUNKIE_API = 'https://api.jnkie.com/api/v2'

const headers = { 'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8' }
const reply = (status: number, text = '') => new Response(text, { status, headers })

type JunkieKey = { key_value?: string; is_invalidated?: boolean; expires_at?: string | null }

async function keyIsValid(key: string): Promise<boolean> {
  const apiKey = process.env.JUNKIE_API_KEY
  if (!apiKey) throw new Error('JUNKIE_API_KEY missing')
  const res = await fetch(`${JUNKIE_API}/keys?limit=20&key=${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`junkie ${res.status}`)
  const body = (await res.json()) as { keys?: JunkieKey[] }
  const now = Date.now()
  // a one-time key counts as valid after its first use: the Junkie loader has just consumed it for this very session
  return (body.keys ?? []).some(
    (k) =>
      typeof k.key_value === 'string' &&
      k.key_value.toUpperCase() === key.toUpperCase() &&
      !k.is_invalidated &&
      (!k.expires_at || Date.parse(k.expires_at) > now),
  )
}

async function fetchScript(file: string): Promise<string | null> {
  const token = process.env.GH_SCRIPT_TOKEN
  if (!token) throw new Error('GH_SCRIPT_TOKEN missing')
  const repo = process.env.GH_SCRIPT_REPO || 'Zkxrll/mmh'
  const branch = process.env.GH_SCRIPT_BRANCH || 'main'
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${file}?ref=${encodeURIComponent(branch)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.raw+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'zkxhub-gate',
    },
    cache: 'no-store',
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`github ${res.status}`)
  return await res.text()
}

export async function POST(req: Request) {
  let body: { g?: unknown; k?: unknown }
  try {
    body = await req.json()
  } catch {
    return reply(400, 'bad request')
  }
  const file = FILES[String(body?.g ?? '')]
  const key = String(body?.k ?? '').trim()
  if (!file || !/^[A-Za-z0-9_-]{4,120}$/.test(key)) return reply(400, 'bad request')
  if (key.toUpperCase() === 'KEYLESS' && process.env.ALLOW_KEYLESS !== '1') return reply(403, 'denied')
  try {
    if (key.toUpperCase() !== 'KEYLESS' && !(await keyIsValid(key))) return reply(403, 'denied')
    const script = await fetchScript(file)
    if (script === null) return reply(404, 'not found')
    return reply(200, script)
  } catch (err) {
    console.error('[gate]', err instanceof Error ? err.message : err) // no secrets in the message
    return reply(503, 'unavailable')
  }
}

export function GET() {
  return reply(405, 'method not allowed')
}
