import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GetKeyButton } from "@/components/get-key-button";
import { siteConfig } from "@/lib/config";

const FEATURES = [
  { label: "Aimbot", value: "Highly configurable aiming system with smooth target tracking, intelligent prioritization, and extensive customization options." },
  { label: "ESP", value: "Clean and optimized visuals with support for customizable indicators, colors, and display settings. Built to stay simple while giving you full control over what is shown." },
  { label: "[Partial] UnlockALL", value: "Get access to every cosmetics available in the game, even admin reserved ones." },
] as const;

export default function HomePage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <div
        className="decorative-grid animate-drift pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />
      <div className="decorative-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <SiteHeader />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-10 px-6 py-16 text-center">
        <div className="animate-rise flex flex-col items-center gap-5">
          <h1 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="max-w-lg text-balance text-base text-ink-muted sm:text-lg">
            {siteConfig.tagline}
          </p>
        </div>

        <div className="animate-rise" style={{ animationDelay: "120ms" }}>
          <GetKeyButton />
        </div>

        <a
          href="https://zkx.mysellauth.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="animate-rise group w-full max-w-md rounded-2xl border border-keyframe/30 bg-surface/80 p-6 text-left shadow-[0_0_40px_-20px_var(--color-keyframe)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-keyframe/60 hover:shadow-[0_0_50px_-12px_var(--color-keyframe)]"
          style={{ animationDelay: "220ms" }}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="mb-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-keyframe">
                Premium
              </div>
              <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                Get a Lifetime Premium Key
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Unlock Premium access permanently with a one-time purchase.
              </p>
            </div>
        
            <span className="shrink-0 rounded-lg bg-keyframe px-4 py-2 font-display text-sm font-semibold text-bg transition-transform duration-200 group-hover:scale-105">
              Buy Now
            </span>
          </div>
        </a>

        <dl
          className="animate-rise grid grid-cols-1 gap-x-10 gap-y-4 text-sm text-ink-muted sm:grid-cols-3"
          style={{ animationDelay: "320ms" }}
        >
          {FEATURES.map((feature) => (
            <div key={feature.label} className="flex flex-col items-center gap-1">
              <dt className="font-mono text-xs uppercase tracking-widest text-keyframe">
                {feature.label}
              </dt>
              <dd>{feature.value}</dd>
            </div>
          ))}
        </dl>
      </main>

      <SiteFooter />
    </div>
  );
}
