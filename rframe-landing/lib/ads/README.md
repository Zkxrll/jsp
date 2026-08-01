# Adding an ad provider

This folder is the only place third-party ad code is allowed to live.
Nothing in `app/` or `components/` should import a network's SDK
directly — route it through `AdSlot` instead, so the site keeps working
(and keeps loading fast) if a provider is ever swapped or removed.

## Steps

1. Confirm the provider gives you a plain `<script src="...">` tag or a
   documented programmatic init call. `AdSlot` supports both.
2. Add an entry to the `providers` map at the top of `ad-slot.tsx`:
   ```ts
   const providers: Partial<Record<AdSlotProps["slot"], AdProvider>> = {
     footer: {
       id: "your-provider",
       scriptSrc: "https://provider.example/tag.js",
     },
   };
   ```
3. Uncomment the matching `<AdSlot slot="footer" />` line already sitting
   in `components/site-footer.tsx`.
4. Test on a Vercel preview deploy before promoting to production. Ad
   scripts run arbitrary third-party JavaScript on your domain — a bad
   one can tank Core Web Vitals or trigger a browser/AV warning across
   the whole site, not just the slot it's in.

## On provider selection

Worth deciding deliberately rather than defaulting into: networks that
rely on pop-unders, forced redirects, or fake system alerts (rather
than in-page display units) take traffic that cleaner networks won't,
but they're also a common reason an otherwise-clean domain ends up on
a browser or antivirus blocklist — which is expensive to undo and hits
every visitor, not just the ones who'd have clicked the ad. That's a
call for whoever owns this domain to make; this codebase doesn't
enforce either way, it just keeps the choice isolated to this one file.
