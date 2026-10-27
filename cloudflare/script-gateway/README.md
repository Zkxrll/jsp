# Cloudflare script gateway

This Worker is a separate candidate replacement for the Vercel `POST /api/s` route. It preserves that route's current request contract, game-ID allowlist, Junkie key check, private GitHub lookup, and plain-text response.

It is not deployed and does not change the production Vercel app.

## Important: confirm the live request path first

The public bootstrap in `ZkxrI/ZkxHub/source` loads a Junkie-hosted loader. The private `Zkxrll/mmh/L04D3R` file currently points directly at GitHub Raw URLs; it does not call `/api/s` or send the `{ g, k }` body expected by this Worker. The active payload may be configured in Junkie and may differ from that repository file.

Before switching anything, check Vercel **Usage → Fast Origin Transfer → Top Paths** and confirm `/api/s` (or the Vercel endpoint you intend to replace) is materially contributing to FOT. Then confirm which script loader is actually published through Junkie and how it obtains the user's key. Do not simply replace the raw URLs in `L04D3R`: without the active loader's key flow, that would likely break script loading.

## 1. Deploy the Worker

From the repository root, authenticate with Cloudflare and create the Worker:

```sh
npx wrangler@latest login
npx wrangler@latest deploy --config cloudflare/script-gateway/wrangler.toml
```

This creates the Worker and prints its `workers.dev` URL. Until the secrets are configured, the gateway returns `503 unavailable`.

## 2. Add secrets in Cloudflare

In **Cloudflare Dashboard → Workers & Pages → zkxhub-script-gateway → Settings → Variables and Secrets**, add these as **Secret** values:

- `JUNKIE_API_KEY`: your existing Junkie REST API key, with permission to look up keys.
- `GH_SCRIPT_TOKEN`: a GitHub token with read-only Contents access to the private `Zkxrll/mmh` repository only.

Do not put either secret in `wrangler.toml`, source control, the website, or client-side code. You can also set them through Wrangler's `secret put` command, which prompts for the values rather than requiring them in command history:

```sh
npx wrangler@latest secret put JUNKIE_API_KEY --config cloudflare/script-gateway/wrangler.toml
npx wrangler@latest secret put GH_SCRIPT_TOKEN --config cloudflare/script-gateway/wrangler.toml
```

The repo and branch are non-secret settings in `wrangler.toml`. `ALLOW_KEYLESS` is set to `0` by default.

## 3. Test before changing the loader

Use the Worker URL printed by Wrangler, appending `/api/s`.

A GET request should return `405 method not allowed`. An invalid key should return `403 denied`:

```sh
curl -i -X POST "https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/api/s" \
  -H "Content-Type: application/json" \
  --data '{"g":"6035872082","k":"not-a-real-key"}'
```

Only test a valid key in your own environment. Do not put real keys in source code, screenshots, issues, or shell history.

## 4. Switch the active loader only after identifying it

When the live loader has been confirmed to use the same POST contract as the existing Vercel route, change that endpoint to:

```text
https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/api/s
```

Keep the JSON body compatible: `g` is the supported Roblox game ID and `k` is the user's key. The Worker returns the script as plain text.

Leave Vercel's existing route in place until the new endpoint works in a real session. If the actual loader is configured in Junkie, its URL will need to be changed in that configuration; the public bootstrap file alone does not show how the active key handoff works.

## Behavior and limitations

- Every non-keyless request is checked against Junkie; invalidated or expired keys are rejected.
- Script text is cached in Worker memory for at most 30 seconds per active isolate. This is only a best-effort performance optimization; isolates may be recycled.
- Secrets and request bodies are never logged. Errors return generic responses.
- Moving script delivery off Vercel removes those response bytes from Vercel Fast Origin Transfer. It does not make a delivered script impossible to dump: a client that receives executable text can still inspect or save it.
