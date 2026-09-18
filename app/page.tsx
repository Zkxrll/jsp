import Link from "next/link";
import Image from "next/image";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GetKeyButton } from "@/components/get-key-button";
import { FAQ } from "@/components/faq";
import { FeatureGrid } from "@/components/feature-grid";
import { CopyDiscordButton } from "@/components/copy-discord-button";
import { DiscordGlyph } from "@/components/discord-glyph";
import { ScrollReveal } from "@/components/scroll-reveal";
import { siteConfig } from "@/lib/config";
import { stats, menuTabs } from "@/lib/features";

const PREMIUM_URL = "https://zkx.mysellauth.com/";

const CHANGELOG = [
  {
    tag: "Current build",
    title: "Flickbot feel and Triggerbot checks",
    body: "Flickbot got curvature and humanness sliders so the flick reads like a hand, not a snap. Triggerbot now skips katana deflects and riot shields unless your weapon pierces them.",
  },
  {
    tag: "Recent",
    title: "World lighting presets",
    body: "Save your bloom, color grading, skybox, and weather setups and load them back next session instead of dialing them in every time.",
  },
] as const;

const PREMIUM_PERKS = [
  "One-time payment",
  "Lifetime access",
  "Priority support in Discord",
  "All future updates",
] as const;

function CheckMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-keyframe-strong"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="site-shell relative flex min-h-dvh flex-col overflow-hidden">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      <ScrollReveal />

      {/* Top Discord bar: joining is the first thing on the page. */}
      <div className="topbar">
        <span className="inline-flex items-center gap-2">
          <DiscordGlyph className="h-4 w-4 text-keyframe-strong" />
          New builds and keys drop in the Discord first.
        </span>
        <a
          href={siteConfig.links.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-discord px-3.5 py-1.5 text-xs"
        >
          Join
        </a>
      </div>

      <SiteHeader />

      <main className="relative z-10 flex-1">
        {/* Hero */}
        <section className="mx-auto w-full max-w-4xl px-5 pb-20 pt-10 text-center sm:px-8 sm:pt-16">
          <div className="logo-badge animate-rise mx-auto">
            <Image
              src="/logo.jpg"
              alt="Zkx Hub"
              width={360}
              height={360}
              priority
              className="h-auto w-44 sm:w-52"
            />
          </div>

          <h1 className="animate-rise mt-2 text-5xl sm:text-6xl" style={{ animationDelay: "80ms" }}>
            The full <span className="text-gradient">Rivals</span> menu.
          </h1>

          <p
            className="lede animate-rise mx-auto mt-5 max-w-xl"
            style={{ animationDelay: "150ms" }}
          >
            Silent and camera aim, voidspam antihit, weapon mods, ESP, chams, and
            a full world editor. One key, one payment, updated when the game
            changes.
          </p>

          <div
            className="animate-rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "220ms" }}
          >
            <GetKeyButton />
            <a
              href={siteConfig.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-discord w-full sm:w-auto"
            >
              <DiscordGlyph className="h-4 w-4" />
              Join Discord
            </a>
          </div>

          {/* Stats */}
          <div
            className="animate-rise mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
            style={{ animationDelay: "300ms" }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="card px-5 py-5 text-center">
                <div className="font-display text-lg font-black tracking-tight text-ink">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Menu ticker */}
          <div className="animate-rise mx-auto mt-10 max-w-3xl" style={{ animationDelay: "360ms" }}>
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
              Eleven tabs in the menu
            </p>
            <div className="marquee">
              <div className="marquee-track">
                {[...menuTabs, ...menuTabs].map((tab, index) => (
                  <span key={`${tab}-${index}`} className="chip whitespace-nowrap">
                    {tab}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature showcase */}
        <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div
            className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
            data-reveal
          >
            <div>
              <p className="eyebrow">Everything inside</p>
              <h2 className="section-title mt-3">What the menu does.</h2>
            </div>
            <p className="lede max-w-md md:text-right">
              Ten groups of features, pulled straight from the in-game menu.
              Nothing here is a feature the script does not have.
            </p>
          </div>

          <FeatureGrid />
        </section>

        {/* Defense spotlight */}
        <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="card p-6 sm:p-10" data-reveal>
            <p className="eyebrow">Defense</p>
            <h2 className="section-title mt-4 max-w-3xl">Most scripts stop at silent aim.</h2>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <p className="lede">
                Zkx Hub ships a working antihit. Voidspam teleports the root you
                replicate far into the void on every server tick, so the shots
                people land are landing on a copy that is not where you are
                standing.
              </p>
              <p className="lede">
                Anti-Aim runs on top of it. It spoofs the yaw you send with spin,
                jitter, or a fake backwards facing, and can forge the server look
                angle so peek logic and aim assists resolve the wrong direction.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Voidspam", "Camera Anchor", "Spin", "Jitter", "Server Look Forge", "Fake Pitch"].map(
                (tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Premium */}
        <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="card p-6 sm:p-10" data-reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow">Premium</p>
                <h2 className="section-title mt-4">
                  One purchase. <span className="text-gradient">No subscription.</span>
                </h2>
                <p className="lede mt-5">
                  Premium is a single payment that stays yours. No monthly key, no
                  renewal, and every future update is included.
                </p>
              </div>
              <Link
                href={PREMIUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary shrink-0"
              >
                Get Lifetime Premium
              </Link>
            </div>

            <div className="mt-8 grid gap-3 border-t border-surface-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {PREMIUM_PERKS.map((perk) => (
                <div key={perk} className="flex items-center gap-2.5 text-sm text-ink-soft">
                  <CheckMark />
                  {perk}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community + access */}
        <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div
            className="card flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between"
            data-reveal
          >
            <div className="max-w-lg">
              <h2 className="section-title">Get your key in the Discord.</h2>
              <p className="lede mt-4">
                Keys, updates, and support all live in one server. Join it, run the
                access step, and you are in. It is also where new builds get posted
                first.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <Link href="/get-key" className="btn btn-primary w-full sm:w-auto">
                Get Key
              </Link>
              <a
                href={siteConfig.links.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-discord w-full sm:w-auto"
              >
                <DiscordGlyph className="h-4 w-4" />
                Join Discord
              </a>
              <CopyDiscordButton />
            </div>
          </div>
        </section>

        {/* Changelog */}
        <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div data-reveal>
            <p className="eyebrow">Updates</p>
            <h2 className="section-title mt-3">Latest changes.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {CHANGELOG.map((entry) => (
              <article key={entry.title} className="card card-hover p-6" data-reveal>
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-keyframe-strong">
                  {entry.tag}
                </span>
                <h3 className="mt-3 text-lg">{entry.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{entry.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="mb-8 text-center" data-reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title mt-3">Before you grab a key.</h2>
          </div>
          <div data-reveal>
            <FAQ />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
