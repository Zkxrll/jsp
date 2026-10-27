# Cloudflare script gateway

This Worker is a drop-in replacement for the Vercel `POST /api/s` script-delivery route. It keeps the existing game-ID mapping and Junkie key checks, reads scripts from the private GitHub repository, and returns plain text only after validation.

The Worker is deliberately separate from the Next.js app. Deploying it does not change the production Vercel deployment.

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

## 3. Test before changing the Roblox loader

Use the Worker URL printed by Wrangler, appending `/api/s`.

A GET request should return `405 method not allowed`. An invalid key should return `403 denied`:

```sh
curl -i -X POST "https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/api/s" \
  -H "Content-Type: application/json" \
  --data '{"g":"6035872082","k":"not-a-real-key"}'
```

Only test a valid key in your own environment. Do not put real keys in source code, screenshots, issues, or shell history.

## 4. Switch the private loader

In the private Roblox loader source, change the URL used for its existing POST request from the Vercel `/api/s` endpoint to:

```text
https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/api/s
```

Keep the same JSON body: `g` is the supported Roblox game ID and `k` is the user's key. The Worker returns the script as plain text, so the loader should continue handling the response as it does now.

The private loader repository is not available through the GitHub connection used for this change, so this URL switch must be made there after the Worker has been deployed and tested. Leave Vercel's existing route in place until the new endpoint works in a real Roblox session; once all clients use the Worker, script responses stop flowing through Vercel's Function.

## Behavior and limitations

- Every non-keyless request is checked against Junkie; invalidated or expired keys are rejected.
- Script text is cached in Worker memory for at most 30 seconds per active isolate. This is only a best-effort performance optimization; isolates may be recycled.
- Secrets and request bodies are never logged. Errors return generic responses.
- Moving delivery off Vercel removes these script response bytes from Vercel Fast Origin Transfer. It does not make a delivered script impossible to dump: a client that receives executable text can still inspect or save it.
