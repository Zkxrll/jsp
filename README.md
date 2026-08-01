# rFrame Animator — landing page

A key-gateway landing page: visitors land here, see the product, click
**Get Key**, and get redirected to wherever your key/license system
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
  layout.tsx        Fonts, <head> metadata, global providers (none yet)
  page.tsx           The landing page itself
  globals.css        Tailwind import + all design tokens (@theme)
  status/page.tsx     Example second page — see "Adding a page" below
  not-found.tsx       Custom 404
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

- **Colors / fonts** — `app/globals.css`, inside the `@theme` block.
  Tailwind v4 generates every `bg-*` / `text-*` / `font-*` utility used
  across the app directly from those values; there's no separate config
  file to keep in sync.
- **Logo** — `components/logo.tsx` is one inline SVG (`currentColor`,
  so it inherits whatever text color wraps it). Swap the `<path>`/`<rect>`
  contents for your own mark, or replace the component body with an
  `<Image>` if you'd rather ship a raster/logo file.
- **Hero copy, feature row** — `app/page.tsx`. The three feature
  entries near the bottom of the hero are placeholder copy — replace
  with whatever's actually true of your product.
- **Favicon / OG image** — not included; drop `favicon.ico` and an
  `opengraph-image.png` into `app/` and Next.js will pick them up
  automatically (this is a Next.js file-convention, not something to
  wire up manually).

## Adding a page

`app/status/page.tsx` exists specifically as a template for this. To
add `/changelog`: create `app/changelog/page.tsx` following the same
shape (import `SiteHeader`/`SiteFooter`, export `metadata`, export a
default component), then add `/changelog` to the `routes` array in
`app/sitemap.ts`. Nothing else in the app needs to change to support a
new route.

## Ad providers (Monetag, PopAds, AdMaven, or anything else)

Nothing is wired in. See **`lib/ads/README.md`** for the exact steps —
it's a three-line change in `lib/ads/ad-slot.tsx` and one commented-out
line in `components/site-footer.tsx` to uncomment. That file also has
a note on why some networks are worth avoiding regardless of what
they'll accept — worth reading before picking one.

## Analytics

`lib/analytics.ts` exports a typed `track()` function that currently
just logs to the console outside production. The **Get Key** button
already calls it at the three points that matter (clicked, blocked
because no URL is configured, redirected) — wiring in a real provider
means filling in the body of `track()`, not touching the button.

## A note on this build

I wrote and statically checked every file in this project (import
resolution, bracket balance, correct `"use client"` placement, and
every Tailwind utility class cross-referenced against the tokens that
generate it), and confirmed current package versions against Next.js
and Tailwind's own release pages before pinning them. I could not run
an actual `npm install` / `next build` in the sandbox this was built
in — outbound network access is disabled there — so the one thing I
haven't done is a real compiler/bundler pass. Run `npm install && npm run typecheck && npm run build`
as your first step; if anything surfaces, it'll be something narrower
than "the architecture is wrong."
