import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GetKeyButton } from "@/components/get-key-button";
import { FAQ } from "@/components/faq";
import { CursorGlow } from "@/components/cursor-glow";
import { siteConfig } from "@/lib/config";
import { CopyDiscordButton } from "@/components/copy-discord-button";

const FEATURES = [
  ["01", "Aimbot", "Precision targeting", "Responsive aim assistance built around smooth tracking and configurable behavior.", "⌁"],
  ["02", "ESP", "Full awareness", "Clean visual information that keeps important targets and details visible at a glance.", "◈"],
  ["03", "UnlockALL", "Expanded access", "Explore available cosmetics and content through the hub's extended access features.", "✦"],
] as const;

const STATS = [
  ["03", "Core features"],
  ["24/7", "Access"],
  ["∞", "Lifetime Premium"],
] as const;

export default function HomePage() {
  return (
    <div className="site-shell relative min-h-dvh overflow-hidden">
      <CursorGlow />

      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <div className="pointer-events-none absolute left-1/2 top-[-18rem] z-0 h-[46rem] w-[46rem] -translate-x-1/2 animate-[pulse_9s_ease-in-out_infinite] rounded-full bg-[#7c3aed]/10 blur-[150px]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-[10rem] z-0 h-[39rem] w-[39rem] -translate-x-1/2 rounded-full border border-[#8b5cf6]/[0.045] transition-transform duration-1000 hover:scale-[1.02]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-[16rem] z-0 h-[27rem] w-[27rem] -translate-x-1/2 animate-[spin_35s_linear_infinite] rounded-full border border-dashed border-[#a78bfa]/[0.055]" aria-hidden="true" />

      <SiteHeader />

      <main className="relative z-10">
        <section className="relative mx-auto flex min-h-[calc(100dvh-88px)] max-w-7xl flex-col items-center justify-center px-5 pb-28 pt-16 text-center sm:px-8 lg:px-10">
          <div className="absolute top-[15%] hidden w-full items-center justify-between px-10 font-mono text-[8px] uppercase tracking-[0.24em] text-white/[0.1] xl:flex" aria-hidden="true">
            <span>ZXK / 01</span>
            <span>RIVALS / CORE</span>
          </div>

          <div className="group relative mb-7 flex items-center gap-2 rounded-full border border-[#8b5cf6]/15 bg-[#8b5cf6]/[0.045] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted shadow-[0_0_35px_rgba(139,92,246,0.06)] backdrop-blur-md animate-rise">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8b5cf6] shadow-[0_0_14px_rgba(139,92,246,0.9)]" />
            Rivals script hub
            <span className="text-[#a78bfa]">•</span>
            Built for speed
            <span className="absolute inset-0 rounded-full border border-[#a78bfa]/0 transition-colors duration-500 group-hover:border-[#a78bfa]/15" />
          </div>

          <div className="animate-rise" style={{ animationDelay: "70ms" }}>
            <p className="eyebrow">ZKX HUB / CORE</p>
            <h1 className="mt-4 font-display text-[4.8rem] font-semibold leading-[0.82] tracking-[-0.08em] text-ink sm:text-[7.5rem] lg:text-[9.2rem]">
              <span className="block transition-transform duration-700 hover:-translate-y-1">Zkx</span>
              <span className="relative block bg-gradient-to-r from-white via-[#ded6ff] to-[#7c3aed] bg-clip-text text-transparent">
                Hub.
                <span className="absolute -inset-x-8 -bottom-5 -z-10 h-24 rounded-full bg-[#7c3aed]/10 blur-[45px]" aria-hidden="true" />
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-ink-muted sm:text-base">
              {siteConfig.tagline} A focused interface for your script, access,
              community, and everything around it.
            </p>
          </div>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4 animate-rise" style={{ animationDelay: "150ms" }}>
            <div className="hero-cta transition-transform duration-300 hover:-translate-y-1">
              <GetKeyButton />
            </div>

            <Link
              href="https://zkx.mysellauth.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf6]/35 hover:shadow-[0_18px_50px_rgba(0,0,0,0.3)]"
            >
              <span className="premium-button-content">
                <span className="premium-icon animate-[pulse_3s_ease-in-out_infinite]">✦</span>
                <span>
                  <strong>Lifetime Premium</strong>
                  <small>One-time purchase</small>
                </span>
                <span className="premium-arrow">→</span>
              </span>
            </Link>
          </div>

          <div className="mt-10 grid w-full max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-black/15 text-left shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-lg animate-rise" style={{ animationDelay: "220ms" }}>
            {STATS.map(([value, label], index) => (
              <div key={label} className={`group relative overflow-hidden px-4 py-4 sm:px-6 sm:py-5 ${index !== 2 ? "border-r border-white/[0.06]" : ""}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-[#8b5cf6]/[0.07] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative font-display text-lg font-bold tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-0.5 sm:text-xl">{value}</div>
                <div className="relative mt-1 text-[9px] uppercase tracking-[0.12em] text-ink-muted sm:text-[10px]">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex items-center gap-3 text-[9px] font-mono uppercase tracking-[0.2em] text-ink-muted/60 animate-rise" style={{ animationDelay: "290ms" }}>
            <span className="h-px w-10 bg-white/[0.08]" />
            Scroll to explore
            <span className="animate-bounce text-[#a78bfa]">↓</span>
            <span className="h-px w-10 bg-white/[0.08]" />
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8 lg:px-10">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-left">CAPABILITIES</p>
              <h2 className="section-title mt-2 text-left">Built around the essentials.</h2>
            </div>
            <p className="section-description max-w-md text-left md:text-right">
              Three focused tools. One clean interface. Designed to stay fast,
              readable, and out of your way.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {FEATURES.map(([number, label, title, description, icon]) => (
              <article key={label} className="group relative min-h-[22rem] overflow-hidden rounded-[1.35rem] border border-white/[0.07] bg-[#0c1018]/80 p-6 shadow-[0_20px_55px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#8b5cf6]/30 hover:bg-[#0d111c] hover:shadow-[0_30px_80px_rgba(0,0,0,0.32)]">
                <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#7c3aed]/10 blur-[55px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#8b5cf6]/15 bg-[#8b5cf6]/[0.07] text-xl text-[#a78bfa] transition-all duration-500 group-hover:scale-110 group-hover:rotate-2 group-hover:bg-[#8b5cf6]/10">{icon}</div>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-white/20 transition-colors duration-300 group-hover:text-white/40">{number}</span>
                </div>
                <p className="relative mt-8 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#a78bfa]">{label}</p>
                <h3 className="relative mt-2 font-display text-2xl font-semibold tracking-tight text-ink">{title}</h3>
                <p className="relative mt-3 max-w-sm text-sm leading-7 text-ink-muted">{description}</p>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-[9px] font-mono uppercase tracking-[0.15em] text-ink-muted/60">
                  <span>Ready</span>
                  <span className="text-[#a78bfa] transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8 lg:px-10">
          <div className="grid overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-[#0c1018]/90 shadow-[0_25px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:grid-cols-[1.25fr_0.75fr]">
            <div className="group relative overflow-hidden p-6 sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-[#7c3aed]/10 blur-[75px]" />
              <div className="pointer-events-none absolute right-10 top-10 h-32 w-32 rounded-full border border-[#8b5cf6]/[0.06] transition-transform duration-700 group-hover:scale-125" />
              <p className="relative eyebrow text-left">SYSTEM</p>
              <div className="relative mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="info-card-title text-3xl">Service status</h2>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-ink-muted">A simple snapshot of the services behind the hub.</p>
                </div>
                <div className="status-pill shrink-0 transition-all duration-300 hover:scale-105">
                  <span className="status-dot" />
                  Operational
                </div>
              </div>

              <div className="mt-8 divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.06] bg-black/15">
                {["Key System", "Discord", "Zkx Hub"].map((service) => (
                  <div key={service} className="group flex items-center justify-between px-4 py-4 text-sm transition-colors duration-300 hover:bg-white/[0.025]">
                    <span className="text-ink">{service}</span>
                    <span className="flex items-center gap-2 text-xs text-ink-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.7)] transition-transform duration-300 group-hover:scale-125" />
                      Operational
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="group relative overflow-hidden border-t border-white/[0.06] bg-gradient-to-br from-[#111322] to-[#0a0d14] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-[#8b5cf6]/10 blur-[80px] transition-transform duration-1000 group-hover:scale-125" />
              <p className="relative eyebrow text-left">ACCESS</p>
              <h3 className="relative mt-3 font-display text-3xl font-semibold tracking-tight text-ink">Ready when you are.</h3>
              <p className="relative mt-3 text-sm leading-6 text-ink-muted">Head through the same streamlined Discord verification flow used by the hub.</p>
              <Link href="/get-key" className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#9f7aea] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(124,58,237,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(124,58,237,0.38)]">
                Get your key
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8 lg:px-10">
          <div className="group relative overflow-hidden rounded-[1.5rem] border border-[#8b5cf6]/15 bg-[#0c1018] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.22)] transition-all duration-500 hover:border-[#8b5cf6]/25 hover:shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(124,58,237,0.18),transparent_38%),radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.08),transparent_30%)]" />
            <div className="pointer-events-none absolute right-[-7rem] top-[-7rem] h-72 w-72 rounded-full border border-[#8b5cf6]/[0.07] transition-transform duration-1000 group-hover:scale-110" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="premium-label"><span className="transition-transform duration-500 group-hover:rotate-12">✦</span> PREMIUM</div>
                <h2 className="premium-title mt-4 text-4xl sm:text-5xl">One key.<br /><span>Lifetime access.</span></h2>
                <p className="premium-description mt-5 max-w-xl">Unlock Premium with a one-time purchase and get the full premium experience without a recurring payment.</p>
              </div>
              <Link href="https://zkx.mysellauth.com/" target="_blank" rel="noopener noreferrer" className="premium-panel-button transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(124,58,237,0.35)]">
                Get Lifetime Premium
                <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
              </Link>
            </div>
            <div className="relative mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/[0.06] pt-5 text-xs text-ink-muted">
              {[
                "Lifetime access",
                "One-time purchase",
                "Premium access",
                "Priority support",
              ].map((item) => <span key={item} className="transition-colors duration-300 hover:text-ink">✓ {item}</span>)}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8 lg:px-10">
          <div className="discord-card relative overflow-hidden transition-all duration-500 hover:border-[#5865F2]/25">
            <div className="pointer-events-none absolute right-[-5rem] top-[-6rem] h-60 w-60 animate-[pulse_8s_ease-in-out_infinite] rounded-full bg-[#5865F2]/10 blur-[75px]" />
            <div>
              <p className="eyebrow text-left">COMMUNITY</p>
              <h2 className="info-card-title mt-2">Stay in the loop.</h2>
              <p className="section-description mt-3 max-w-xl text-left">Updates, announcements, support, and release information—straight from the Zkx Hub community.</p>
            </div>
            <div className="relative flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer" className="discord-button transition-all duration-300 hover:-translate-y-1">
                Join Discord
                <span className="transition-transform duration-300 hover:translate-x-0.5">↗</span>
              </a>
              <CopyDiscordButton />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8 lg:px-10">
          <div className="section-heading">
            <div>
              <p className="eyebrow text-left">UPDATES</p>
              <h2 className="section-title mt-2 text-left">Latest changes.</h2>
            </div>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <article className="changelog-item group transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf6]/20">
              <div className="changelog-version"><span>v1.0.10</span><span>Latest</span></div>
              <div>
                <h3 className="changelog-title">Performance & UI refresh</h3>
                <p className="changelog-description">Improved responsiveness, smoother transitions, refreshed access flow, and cleaner spacing across the site.</p>
              </div>
            </article>
            <article className="changelog-item group transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf6]/20">
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
