# Cloudflare script gateway

This Worker is a separate replacement candidate for the Vercel `POST /api/s` script-delivery route. It preserves the request contract, game-ID allowlist, Junkie key checks, private GitHub source lookup, and plain-text response. It has a manual GitHub Actions deployment workflow.

The Worker has **not** been deployed by this PR and does not change Vercel production.

## Before deployment: verify the active caller

Vercel Usage has confirmed that `/api/s` is the path consuming your Fast Origin Transfer. That means the Worker migration targets the right endpoint.

The public bootstrap in `ZkxrI/ZkxHub/source` loads a Junkie-hosted loader, and the private `Zkxrll/mmh/L04D3R` file currently points directly at GitHub Raw. The active script caller/key handoff may be configured in Junkie and may differ from that file. Before changing client code, confirm which loader is actually calling Vercel `/api/s` and update that caller to use the Worker URL after deployment. Do not replace unrelated Raw URLs.

## 1. Create a Cloudflare account and an empty Worker

1. Create an account at https://dash.cloudflare.com/sign-up and verify your email.
2. Open **Workers & Pages**.
3. If asked, create/enable your `workers.dev` subdomain. You do **not** need to add a custom domain or transfer your website to Cloudflare.
4. Select **Create application** / **Create Worker** and start from a Hello World/HTTP Worker template.
5. Name it exactly `zkxhub-script-gateway` and deploy the placeholder. This placeholder will be replaced by the workflow. Creating it first lets the CI token have narrower edit permissions instead of account-wide permission to create Workers.

## 2. Create a Cloudflare API token and find the account ID

Create a token from **Manage Account → API Tokens** or **My Profile → API Tokens → Create Token**. Select the **Edit Cloudflare Workers** template and restrict its account resource to the account you just created. Do not use the Global API Key. The Worker should already exist before you create this token; the token only needs the Workers edit permission needed to update the existing Worker.

Copy the API token immediately; Cloudflare displays its value only once.

Find your account ID under **Workers & Pages → Account Details → Account ID**. Official guide: https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/.

## 3. Add GitHub Actions secrets

In the **Zkxrll/jsp** repository, open **Settings → Secrets and variables → Actions → New repository secret**. Add these four secrets:

- `CLOUDFLARE_API_TOKEN`: the restricted Cloudflare API token from step 2.
- `CLOUDFLARE_ACCOUNT_ID`: the account ID for the same Cloudflare account.
- `JUNKIE_API_KEY`: the Junkie REST API key used to query key validity. It needs the REST API access scope used by the current Vercel endpoint. If you cannot retrieve the saved Vercel value, create a replacement API key in Junkie with equivalent access and use it for this Worker; don't paste it into chat.
- `GH_SCRIPT_TOKEN`: a fine-grained GitHub token restricted to the private `Zkxrll/mmh` repository with **Contents: Read-only**. If an old token is not visible, create a new one with this limited access.

Get and store all secret values privately. Do not paste them into chat, commit them, put them into `wrangler.toml`, or include them in logs. The workflow sends the Junkie and GitHub values to Cloudflare as Worker secrets without printing their values.

Official guidance: https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/ and https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets.

## 4. Merge the pull request, then deploy manually

After reviewing and merging this PR, open **Actions → Deploy Cloudflare script gateway → Run workflow** on the `main` branch. Enter exactly `deploy` in the confirmation field.

The workflow uses a pinned Wrangler CLI version, deploys the Worker code, and provisions the two application secrets. It refuses to run on a branch other than `main` or without all four GitHub Actions secrets. The first deployment may briefly return `503 unavailable` between publishing the code and setting the application secrets.

The Worker URL will be similar to `https://zkxhub-script-gateway.<your-subdomain>.workers.dev`.

## 5. Smoke-test before changing clients

A GET request to `/api/s` should return `405 method not allowed`. An invalid key should return `403 denied`:

```sh
curl -i -X POST "https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/api/s" \
  -H "Content-Type: application/json" \
  --data '{"g":"6035872082","k":"not-a-real-key"}'
```

Only test a valid key in your own environment. Do not put real keys in source code, screenshots, issues, or shell history.

## 6. Change the active client to the Worker

After the invalid-key test succeeds, update the *actual* loader that calls Vercel `/api/s` to use:

```text
https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/api/s
```

Keep its existing POST body and response handling: `g` is the supported Roblox game ID, `k` is the user's key, and the Worker returns the script as plain text. Test with a valid key in a real session before retiring the Vercel route.

Leave the old Vercel endpoint in place until the new endpoint and active loader have been verified. If the live loader is configured in Junkie, change that caller there; the public bootstrap alone does not show how the active key handoff works.

## Behavior and limitations

- Every non-keyless request is checked against Junkie; invalidated or expired keys are rejected. Key authorization results are never cached.
- Script text is cached in Worker memory for up to 30 seconds per active isolate. This is best-effort only; Cloudflare may recycle isolates.
- Secrets and request bodies are never logged. Errors return generic responses.
- This migration reduces Vercel Fast Origin Transfer by moving the response body off Vercel. It cannot make a script impossible to dump after it has been sent to a client.
