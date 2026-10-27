# Cloudflare script gateway

This Worker is a separate replacement candidate for the Vercel `POST /api/s` script-delivery route. It preserves the request contract, game-ID allowlist, Junkie key checks, private GitHub source lookup, and plain-text response. It has a manual GitHub Actions deployment workflow.

The Worker has **not** been deployed by this PR and does not change Vercel production.

## Before deployment: verify the active caller

Vercel Usage has confirmed that `/api/s` is the path consuming your Fast Origin Transfer. That means the Worker migration targets the right endpoint.

The public bootstrap in `ZkxrI/ZkxHub/source` loads a Junkie-hosted loader, and the private `Zkxrll/mmh/L04D3R` file currently points directly at GitHub Raw. The active script caller/key handoff may be configured in Junkie and may differ from that file. Before changing client code, confirm which loader is actually calling Vercel `/api/s` and update that caller to use the Worker URL after deployment. Do not replace unrelated Raw URLs.

## 1. Add GitHub Actions secrets

In the **Zkxrll/jsp** repository, open **Settings → Secrets and variables → Actions → New repository secret**. Add these four secrets:

- `CLOUDFLARE_API_TOKEN`: create a Cloudflare API token that can edit Workers for the account where you want to host this endpoint. Keep the token limited to the required Workers permissions.
- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID for that same account. This is an identifier, not a secret, but the workflow reads it as a repository secret for simplicity.
- `JUNKIE_API_KEY`: the existing Junkie REST API key used by the Vercel route, with permission to look up keys.
- `GH_SCRIPT_TOKEN`: a GitHub token with read-only Contents access to the private `Zkxrll/mmh` repository only.

Get the two existing application-secret values from your own trusted configuration. Do not paste them into chat, commit them, put them into `wrangler.toml`, or include them in logs. The workflow sends the Junkie and GitHub values to Cloudflare as Worker secrets without printing their values.

Official Cloudflare guidance: https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/ and https://developers.cloudflare.com/workers/configuration/secrets/.

## 2. Merge the pull request, then deploy manually

After reviewing and merging this PR, open **Actions → Deploy Cloudflare script gateway → Run workflow** on the `main` branch. Enter exactly `deploy` in the confirmation field.

The workflow uses a pinned Wrangler CLI version, deploys the Worker code, and provisions the two application secrets. It refuses to run on a branch other than `main` or without all four GitHub Actions secrets. The first deployment may briefly return `503 unavailable` between publishing the code and setting the application secrets.

The resulting Worker URL will appear in the workflow logs, normally as `https://zkxhub-script-gateway.<your-subdomain>.workers.dev`.

## 3. Smoke-test before changing clients

A GET request to `/api/s` should return `405 method not allowed`. An invalid key should return `403 denied`:

```sh
curl -i -X POST "https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/api/s" \
  -H "Content-Type: application/json" \
  --data '{"g":"6035872082","k":"not-a-real-key"}'
```

Only test a valid key in your own environment. Do not put real keys in source code, screenshots, issues, or shell history.

## 4. Change the active client to the Worker

After the invalid-key test succeeds, update the *actual* loader that calls Vercel `/api/s` to use:

```text
https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/api/s
```

Keep its existing POST body and response handling: `g` is the supported Roblox game ID, `k` is the user's key, and the Worker returns the script as plain text. Test with a valid key in a real session before retiring the Vercel route.

Once every client uses the Worker, those script-response bytes will no longer be sent through Vercel's Function. Keep the Vercel route available until that migration has been confirmed.

## Behavior and limitations

- Every non-keyless request is checked against Junkie; invalidated or expired keys are rejected. Key authorization results are never cached.
- Script text is cached in Worker memory for up to 30 seconds per active isolate. This is best-effort only; Cloudflare may recycle isolates.
- Secrets and request bodies are never logged. Errors return generic responses.
- This migration reduces Vercel Fast Origin Transfer by moving the response body off Vercel. It cannot make a script impossible to dump after it has been sent to a client.
