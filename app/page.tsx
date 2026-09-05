import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GetKeyButton } from "@/components/get-key-button";
import { FAQ } from "@/components/faq";
import { CursorGlow } from "@/components/cursor-glow";
import { siteConfig } from "@/lib/config";
import { CopyDiscordButton } from "@/components/copy-discord-button";

const FEATURES = [
  {
    number: "01",
    label: "Aimbot",
    title: "Precision targeting",
    description:
      "Responsive aim assistance built around smooth tracking and configurable behavior.",
    icon: "⌁",
  },
  {
    number: "02",
    label: "ESP",
    title: "Full awareness",
    description:
      "Clean visual information that keeps important targets and details visible at a glance.",
    icon: "◈",
  },
  {
    number: "03",
    label: "UnlockALL",
    title: "Expanded access",
    description:
      "Explore available cosmetics and content through the hub's extended access features.",
    icon: "✦",
  },
] as const;

export default function HomePage() {
  return (
    <div className="site-shell relative min-h-dvh overflow-hidden">
      <CursorGlow />

      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <div className="pointer-events-none absolute left-1/2 top-[-12rem] z-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[#7c3aed]/12 blur-[130px]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-[11rem] z-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full border border-[#8b5cf6]/[0.07]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-[15rem] z-0 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full border border-[#a78bfa]/[0.07]" aria-hidden="true" />

      <SiteHeader />

      <main className="relative z-10">
        <section className="relative mx-auto flex min-h-[calc(100dvh-88px)] max-w-7xl flex-col items-center justify-center px-5 pb-24 pt-16 text-center sm:px-8 lg:px-10">
          <div className="mb-5 flex items-center gap-2 rounded-full border border-[#8b5cf6]/15 bg-[#8b5cf6]/[0.045] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted shadow-[0_0_30px_rgba(139,92,246,0.06)] animate-rise">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8b5cf6] shadow-[0_0_12px_rgba(139,92,246,0.9)]" />
            Rivals script hub
            <span className="text-[#a78bfa]">•</span>
            Built for speed
          </div>

          <div className="animate-rise" style={{ animationDelay: "70ms" }}>
            <p className="eyebrow">ZKX HUB / CORE</p>
            <h1 className="mt-4 font-display text-[4.5rem] font-semibold leading-[0.86] tracking-[-0.07em] text-ink sm:text-[7rem] lg:text-[8.5rem]">
              <span className="block">Zkx</span>
              <span className="block bg-gradient-to-r from-white via-[#c4b5fd] to-[#7c3aed] bg-clip-text text-transparent">Hub.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-ink-muted sm:text-base">
              {siteConfig.tagline} A focused interface for your script, access,
              community, and everything around it.
            </p>
          </div>

          <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4 animate-rise" style={{ animationDelay: "150ms" }}>
            <div className="hero-cta">
              <GetKeyButton />
            </div>

            <Link
              href="https://zkx.mysellauth.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button"
            >
              <span className="premium-button-content">
                <span className="premium-icon">✦</span>
                <span>
                  <strong>Lifetime Premium</strong>
                  <small>One-time purchase</small>
                </span>
                <span className="premium-arrow">→</span>
              </span>
            </Link>
          </div>

          <div className="mt-10 grid w-full max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-black/15 text-left shadow-[0_20px_60px_rgba(0,0,0,0.18)] animate-rise" style={{ animationDelay: "220ms" }}>
            {[
              ["03", "Core features"],
              ["24/7", "Access"],
              ["∞", "Lifetime Premium"],
            ].map(([value, label], index) => (
              <div key={label} className={`px-4 py-4 sm:px-6 sm:py-5 ${index !== 2 ? "border-r border-white/[0.06]" : ""}`}>
                <div className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">{value}</div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-ink-muted sm:text-[10px]">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex items-center gap-3 text-[9px] font-mono uppercase tracking-[0.2em] text-ink-muted/60 animate-rise" style={{ animationDelay: "290ms" }}>
            <span className="h-px w-10 bg-white/[0.08]" />
            Scroll to explore
            <span className="h-px w-10 bg-white/[0.08]" />
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-left">CAPABILITIES</p>
              <h2 className="section-title mt-2 text-left">Built around the essentials.</h2>
            </div>
            <p className="section-description max-w-md text-left md:text-right">
              A cleaner front end for the tools that matter, with the same dark
              purple visual language as the access page.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <article key={feature.label} className="group relative min-h-[22rem] overflow-hidden rounded-[1.35rem] border border-white/[0.07] bg-[#0c1018]/85 p-6 shadow-[0_20px_55px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#8b5cf6]/25 hover:shadow-[0_25px_70px_rgba(0,0,0,0.28)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(124,58,237,0.12),transparent_45%)] opacity-70" />
                <div className="relative flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#8b5cf6]/15 bg-[#8b5cf6]/[0.07] text-xl text-[#a78bfa] transition-transform duration-300 group-hover:scale-105">
                    {feature.icon}
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-white/25">{feature.number}</span>
                </div>
                <p className="relative mt-8 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#a78bfa]">{feature.label}</p>
                <h3 className="relative mt-2 font-display text-2xl font-semibold tracking-tight text-ink">{feature.title}</h3>
                <p className="relative mt-3 max-w-sm text-sm leading-7 text-ink-muted">{feature.description}</p>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-[9px] font-mono uppercase tracking-[0.15em] text-ink-muted/60">
                  <span>Ready</span>
                  <span className="text-[#a78bfa] transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
          <div className="grid overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-[#0c1018]/90 shadow-[0_25px_70px_rgba(0,0,0,0.22)] lg:grid-cols-[1.25fr_0.75fr]">
            <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7c3aed]/12 blur-[70px]" />
              <p className="relative eyebrow text-left">SYSTEM</p>
              <div className="relative mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="info-card-title text-3xl">Service status</h2>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-ink-muted">A simple snapshot of the services behind the hub.</p>
                </div>
                <div className="status-pill shrink-0">
                  <span className="status-dot" />
                  Operational
                </div>
              </div>

              <div className="mt-8 divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.06] bg-black/15">
                {["Key System", "Discord", "Zkx Hub"].map((service, index) => (
                  <div key={service} className="flex items-center justify-between px-4 py-4 text-sm">
                    <span className="text-ink">{service}</span>
                    <span className="flex items-center gap-2 text-xs text-ink-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.7)]" />
                      Operational
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden border-t border-white/[0.06] bg-gradient-to-br from-[#111322] to-[#0a0d14] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#8b5cf6]/10 blur-[80px]" />
              <p className="relative eyebrow text-left">ACCESS</p>
              <h3 className="relative mt-3 font-display text-3xl font-semibold tracking-tight text-ink">Ready when you are.</h3>
              <p className="relative mt-3 text-sm leading-6 text-ink-muted">Head through the same streamlined Discord verification flow used by the hub.</p>
              <Link href="/get-key" className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#9f7aea] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(124,58,237,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(124,58,237,0.35)]">
                Get your key
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-[#8b5cf6]/15 bg-[#0c1018] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.22)] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(124,58,237,0.17),transparent_38%),radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.08),transparent_30%)]" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="premium-label">
                  <span>✦</span>
                  PREMIUM
                </div>
                <h2 className="premium-title mt-4 text-4xl sm:text-5xl">One key.<br /><span>Lifetime access.</span></h2>
                <p className="premium-description mt-5 max-w-xl">Unlock Premium with a one-time purchase and get the full premium experience without a recurring payment.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="https://zkx.mysellauth.com/" target="_blank" rel="noopener noreferrer" className="premium-panel-button">
                  Get Lifetime Premium
                  <span>↗</span>
                </Link>
              </div>
            </div>
            <div className="relative mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/[0.06] pt-5 text-xs text-ink-muted">
              <span>✓ Lifetime access</span>
              <span>✓ One-time purchase</span>
              <span>✓ Premium access</span>
              <span>✓ Priority support</span>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
          <div className="discord-card relative overflow-hidden">
            <div className="pointer-events-none absolute right-[-4rem] top-[-5rem] h-52 w-52 rounded-full bg-[#5865F2]/10 blur-[70px]" />
            <div>
              <p className="eyebrow text-left">COMMUNITY</p>
              <h2 className="info-card-title mt-2">Stay in the loop.</h2>
              <p className="section-description mt-3 max-w-xl text-left">Updates, announcements, support, and release information—straight from the Zkx Hub community.</p>
            </div>
            <div className="relative flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer" className="discord-button">
                Join Discord
                <span>↗</span>
              </a>
              <CopyDiscordButton />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
          <div className="section-heading">
            <div>
              <p className="eyebrow text-left">UPDATES</p>
              <h2 className="section-title mt-2 text-left">Latest changes.</h2>
            </div>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <article className="changelog-item group">
              <div className="changelog-version"><span>v1.0.10</span><span>Latest</span></div>
              <div>
                <h3 className="changelog-title">Performance & UI refresh</h3>
                <p className="changelog-description">Improved responsiveness, smoother transitions, refreshed access flow, and cleaner spacing across the site.</p>
              </div>
            </article>
            <article className="changelog-item group">
              <div className="changelog-version"><span>Recent</span></div>
              <div>
                <h3 className="changelog-title">Premium access</h3>
                <p className="changelog-description">Added lifetime Premium access with a dedicated one-time purchase flow.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl px-5 pb-28 sm:px-8">
          <div className="mb-7 text-center">
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title mt-2">Questions?</h2>
            <p className="section-description mx-auto mt-3 max-w-xl">A few quick answers before you jump in.</p>
          </div>
          <FAQ />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
