import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GetKeyButton } from "@/components/get-key-button";
import { TimelineStrip } from "@/components/timeline-strip";
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

        <div className="animate-rise" style={{ animationDelay: "220ms" }}>
          <TimelineStrip />
        </div>

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
