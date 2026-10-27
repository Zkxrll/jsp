export interface Env {
  JUNKIE_API_KEY: string;
  GH_SCRIPT_TOKEN: string;
  GH_SCRIPT_REPO?: string;
  GH_SCRIPT_BRANCH?: string;
  ALLOW_KEYLESS?: string;
}

type RequestBody = { g?: unknown; k?: unknown };
type JunkieKey = {
  key_value?: string;
  is_invalidated?: boolean;
  expires_at?: string | null;
};

const FILES: Record<string, string> = {
  "6035872082": "R1V4LZ",
  "7264587281": "5N1P3RDU3LZ",
  "10563114921": "5T34L4N3GG",
};

const JUNKIE_API = "https://api.jnkie.com/api/v2";
const RESPONSE_HEADERS = {
  "Cache-Control": "no-store",
  "Content-Type": "text/plain; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
};
const SCRIPT_CACHE_TTL_MS = 30_000;

// Per-isolate cache: only the private script text is cached, never auth results.
// Cloudflare may recycle isolates at any time, so this is best-effort only.
const scriptCache = new Map<string, { expiresAt: number; text: string }>();
const pendingScripts = new Map<string, Promise<string | null>>();

function reply(status: number, text = ""): Response {
  return new Response(text, { status, headers: RESPONSE_HEADERS });
}

async function keyIsValid(key: string, env: Env): Promise<boolean> {
  if (!env.JUNKIE_API_KEY) throw new Error("JUNKIE_API_KEY missing");

  const url = new URL(JUNKIE_API + "/keys");
  url.searchParams.set("limit", "20");
  url.searchParams.set("key", key);

  const response = await fetch(url.toString(), {
    headers: { Authorization: "Bearer " + env.JUNKIE_API_KEY },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("junkie " + response.status);

  const body = (await response.json()) as { keys?: JunkieKey[] };
  const now = Date.now();

  return (body.keys ?? []).some(
    (item) =>
      typeof item.key_value === "string" &&
      item.key_value.toUpperCase() === key.toUpperCase() &&
      !item.is_invalidated &&
      (!item.expires_at || Date.parse(item.expires_at) > now),
  );
}

async function fetchScript(file: string, env: Env): Promise<string | null> {
  const token = env.GH_SCRIPT_TOKEN;
  if (!token) throw new Error("GH_SCRIPT_TOKEN missing");

  const repo = (env.GH_SCRIPT_REPO || "Zkxrll/mmh").trim();
  const branch = (env.GH_SCRIPT_BRANCH || "main").trim();
  const cacheKey = repo + "|" + branch + "|" + file;
  const cached = scriptCache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) return cached.text;
  if (cached) scriptCache.delete(cacheKey);

  const pending = pendingScripts.get(cacheKey);
  if (pending) return pending;

  const request = (async (): Promise<string | null> => {
    const url =
      "https://api.github.com/repos/" +
      repo +
      "/contents/" +
      encodeURIComponent(file) +
      "?ref=" +
      encodeURIComponent(branch);

    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/vnd.github.raw+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "zkxhub-script-gateway",
      },
      cache: "no-store",
    });

    if (response.status === 404) return null;
    if (!response.ok) throw new Error("github " + response.status);

    const text = await response.text();
    scriptCache.set(cacheKey, {
      expiresAt: Date.now() + SCRIPT_CACHE_TTL_MS,
      text,
    });
    return text;
  })();

  pendingScripts.set(cacheKey, request);
  try {
    return await request;
  } finally {
    if (pendingScripts.get(cacheKey) === request) {
      pendingScripts.delete(cacheKey);
    }
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== "/api/s") return reply(404, "not found");
    if (request.method !== "POST") return reply(405, "method not allowed");

    let body: RequestBody;
    try {
      body = (await request.json()) as RequestBody;
    } catch {
      return reply(400, "bad request");
    }

    const file = FILES[String(body?.g ?? "")];
    const key = String(body?.k ?? "").trim();

    if (!file || !/^[A-Za-z0-9_-]{4,120}$/.test(key)) {
      return reply(400, "bad request");
    }

    if (key.toUpperCase() === "KEYLESS" && env.ALLOW_KEYLESS !== "1") {
      return reply(403, "denied");
    }

    try {
      if (key.toUpperCase() !== "KEYLESS" && !(await keyIsValid(key, env))) {
        return reply(403, "denied");
      }

      const script = await fetchScript(file, env);
      if (script === null) return reply(404, "not found");

      return reply(200, script);
    } catch (error) {
      // Deliberately avoid logging request bodies, keys, tokens, or script text.
      console.error(
        "[gate]",
        error instanceof Error ? error.message : "unknown error",
      );
      return reply(503, "unavailable");
    }
  },
};
