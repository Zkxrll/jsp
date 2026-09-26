Zkx Hub — landing page

A key-gateway landing page: visitors land here, see the product, click
**Get Key**, and get redirected to wherever your key system
lives. Built to be edited by one person in one file for the common
changes (branding, redirect URL, links) and to grow into more pages
without a rewrite.

## Stack, and why

| Piece | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Static by default, zero-config on Vercel, room to add API routes or server logic later without switching stacks. |
| Language | TypeScript | The redirect URL, ad-slot registry, and analytics events are all typed — a typo in an env var name or event name fails at build time, not in production. |
| Styling | Tailwind CSS v4 | CSS-first config (no `tailwind.config.js`) — theme tokens live in `app/globals.css`, one file, plain CSS. |
| Hosting | Vercel | Framework's own platform; `git push` is the deploy step. |

No state management library, no CSS-in-JS, no component kit. A
one-page-plus-status-page marketing site doesn't need them, and every
one you add is a thing to keep updated.

## Project structure

```
app/
  layout.tsx          Fonts (next/font), <head> metadata, ad scripts
  page.tsx            The landing page itself
  globals.css         Tailwind import + the design system (tokens, type ramp, components)
  get-key/page.tsx    Get Key flow (UI in components/get-key-flow.tsx)
  status/page.tsx     Status page — also the template for new pages
  not-found.tsx       Custom 404
  opengraph-image.tsx 1200×630 share card, generated at build time
  robots.ts           robots.txt, generated
  sitemap.ts          sitemap.xml, generated
components/          UI pieces — presentational, import from lib/ for data
lib/
  config.ts           *** Single source of truth for branding + redirect URL ***
  analytics.ts        Typed analytics event stub — no provider wired in yet
  ads/                Provider-agnostic ad-slot system — see ads/README.md
```

## Running locally

Requires Node 20.9 or newer.

```bash
npm install
cp .env.example .env.local
# edit .env.local — at minimum, set NEXT_PUBLIC_KEY_SYSTEM_URL
npm run dev
```

Open http://localhost:3000. The **Get Key** button will show a
disabled "Key system unavailable" state until `NEXT_PUBLIC_KEY_SYSTEM_URL`
is set — that's intentional (see `components/get-key-button.tsx`), not
a bug.

Other scripts:

```bash
npm run build       # production build
npm run start        # serve the production build locally
npm run lint          # ESLint
npm run typecheck      # tsc --noEmit
```

## Deploying to Vercel

**Option A — dashboard:**
1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. [vercel.com/new](https://vercel.com/new) → import the repo. Next.js
   is auto-detected; no build settings to change.
3. Add the environment variables from `.env.example` under
   **Settings → Environment Variables** before the first deploy (or
   redeploy after adding them).

**Option B — CLI:**
```bash
npm i -g vercel
vercel          # first deploy, follow the prompts
vercel --prod    # promote to production
```

## Changing configuration values

Everything that isn't hard-coded copy lives in **`lib/config.ts`** or
environment variables. You will not need to touch component code for
any of the following:

| Change | Where |
|---|---|
| Redirect destination ("Get Key" target) | `NEXT_PUBLIC_KEY_SYSTEM_URL` env var |
| Site name, tagline, description | `lib/config.ts` → `siteConfig.name` / `.tagline` / `.description` |
| Discord / docs links | `NEXT_PUBLIC_DISCORD_URL`, `NEXT_PUBLIC_DOCS_URL` env vars (blank hides the link) |
| Status pill state | `NEXT_PUBLIC_SERVICE_STATUS` (`operational` \| `degraded` \| `offline`) |
| Canonical URL for SEO | `NEXT_PUBLIC_SITE_URL` |

Changing an env var in Vercel takes effect on the next deploy — no code
change or rebuild logic needed.

## Updating branding

- **Colors** — `app/globals.css`, inside the `@theme` block.
  Tailwind v4 generates every `bg-*` / `text-*` utility from those values.
- **Fonts** — `app/layout.tsx`: Archivo (display) and Inter (body) via
  `next/font`. One display face, one body face; don't add a third.
- **Design rules** — documented at the top of `app/globals.css`: 4pt
  spacing (whole Tailwind steps only), the type ramp, one radius, one
  button system (`.btn` + `.btn-primary` / `.btn-ghost`, `.btn-sm`).
- **Logo** — `public/logo.jpg` (hero and share card). Favicon is
  `app/icon.png`, iOS home-screen icon `app/apple-icon.png`.
- **Hero copy, features, stats** — `app/page.tsx` and `lib/features.ts`.
- **Share image** — `app/opengraph-image.tsx` renders it from the logo,
  name, and tagline in `lib/config.ts`.

## Adding a page

`app/status/page.tsx` exists specifically as a template for this. To
add `/changelog`: create `app/changelog/page.tsx` following the same
shape (import `SiteHeader`/`SiteFooter`, export `metadata`, export a
default component), then add `/changelog` to the `routes` array in
`app/sitemap.ts`. Nothing else in the app needs to change to support a
new route.

## Ad providers (Monetag, PopAds, AdMaven, or anything else)

Currently live: Monetag (multitag in `components/monetag-script.tsx`
and the push service worker in `public/sw.js`), PopAds
(`components/popads-script.tsx`), and AdMaven (`app/layout.tsx`; its
verification file is `public/BqHw6rdCE.js`). `components/adblock-gate.tsx`
shows a notice to visitors with a blocker.

`public/sw.js` runs third-party code as a service worker scoped to the
whole site, which can see every request made on this origin. Keep that
in mind before adding anything sensitive here.

For display slots, see **`lib/ads/README.md`**.

## Analytics

`lib/analytics.ts` exports a typed `track()` function that currently
just logs to the console outside production. The **Get Key** button
already calls it at the three points that matter (clicked, blocked
because no URL is configured, redirected) — wiring in a real provider
means filling in the body of `track()`, not touching the button.
