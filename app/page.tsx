import Image from "next/image";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GetKeyButton } from "@/components/get-key-button";
import { FAQ } from "@/components/faq";
import { FeatureGrid } from "@/components/feature-grid";
import { CopyDiscordButton } from "@/components/copy-discord-button";
import { DiscordGlyph } from "@/components/discord-glyph";
import { ArrowUpRightIcon, CheckIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/scroll-reveal";
import { siteConfig } from "@/lib/config";
import { stats } from "@/lib/features";

const PREMIUM_URL = "https://zkx.mysellauth.com/";

// TODO: give each entry a real version number and release date. Undated
// "Recent" entries read as filler.
const CHANGELOG = [
  {
    tag: "Current build",
    title: "Flickbot feel and Triggerbot checks",
    body: "Flickbot got curvature and humanness sliders so the flick reads like a hand, not a snap. Triggerbot now skips katana deflects and riot shields unless your weapon pierces them.",
  },
  {
    tag: "Previous build",
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

/** Section heading pattern, identical everywhere: label, title, optional lede. */
function SectionHeader({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return (
    <div data-reveal>
      <p className="label label-accent">{label}</p>
      <h2 className="section-title mt-3">{title}</h2>
      {children}
    </div>
  );
}

function DiscordButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={siteConfig.links.discord}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-ghost ${className}`}
    >
      <DiscordGlyph />
      Join Discord
    </a>
  );
}

export default function HomePage() {
  return (
    <div className="site-shell">
      <div className="grid-overlay" aria-hidden="true" />
      <ScrollReveal />

      <SiteHeader />

      <main className="relative z-10 flex-1">
        {/* Hero */}
        <section className="wrap pb-12 pt-8 text-center sm:pb-16 sm:pt-16">
          <div className="logo-badge animate-rise mx-auto">
            <Image
              src="/logo.jpg"
              alt=""
              width={384}
              height={384}
              priority
              className="h-auto w-32 sm:w-48"
            />
          </div>

          <h1 className="display animate-rise mt-4" style={{ animationDelay: "40ms" }}>
            The full <span className="text-gradient">Rivals</span> menu.
          </h1>

          <p className="lede animate-rise mx-auto mt-4 max-w-xl" style={{ animationDelay: "80ms" }}>
            Silent and camera aim, voidspam antihit, weapon mods, ESP, chams, and a
            full world editor. Free with a key from the Discord, or pay once for
            lifetime Premium.
          </p>

          <div
            className="animate-rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "120ms" }}
          >
            <GetKeyButton source="hero" className="w-full sm:w-auto" />
            <DiscordButton className="w-full sm:w-auto" />
          </div>

          <dl
            className="card animate-rise mx-auto mt-12 grid max-w-xl grid-cols-3 divide-x divide-surface-border"
            style={{ animationDelay: "160ms" }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end gap-1 px-2 py-5 sm:px-4">
                <dt className="label">{stat.label}</dt>
                <dd className="m-0 font-display text-2xl font-extrabold tracking-tight text-ink">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Features */}
        <section id="features" className="wrap py-12 sm:py-16">
          <div className="grid gap-4 md:grid-cols-2 md:items-end md:gap-8">
            <SectionHeader label="Everything inside" title="What the menu does." />
            <p className="lede max-w-md md:justify-self-end" data-reveal>
              Ten feature groups, pulled straight from the in-game menu. Nothing
              here is a feature the script does not have.
            </p>
          </div>

          <div className="mt-8">
            <FeatureGrid />
          </div>
        </section>

        {/* Defense spotlight */}
        <section className="wrap py-12 sm:py-16">
          <div className="card p-6 sm:p-12" data-reveal>
            <p className="label label-accent">Defense</p>
            <h2 className="section-title mt-3 max-w-2xl">Most scripts stop at silent aim.</h2>

            <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-12">
              <p className="lede">
                Zkx Hub ships a working antihit. Voidspam teleports the root you
                replicate far into the void on every server tick, so the shots
                people land hit a copy that is not where you are standing.
              </p>
              <p className="lede">
                Anti-Aim runs on top of it. It spoofs the yaw you send with spin,
                jitter, or a fake backwards facing, and can forge the server look
                angle so peek logic and aim assists resolve the wrong direction.
              </p>
            </div>
          </div>
        </section>

        {/* Premium */}
        <section id="premium" className="wrap py-12 sm:py-16">
          <div className="card p-6 sm:p-12" data-reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="label label-accent">Premium</p>
                <h2 className="section-title mt-3">One purchase. No subscription.</h2>
                <p className="lede mt-4">
                  Premium is a single payment that stays yours. No monthly key, no
                  renewal, and every future update is included.
                </p>
              </div>
              <a
                href={PREMIUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full shrink-0 sm:w-auto"
              >
                Get lifetime Premium
                <ArrowUpRightIcon />
              </a>
            </div>

            <ul className="mt-8 grid gap-4 border-t border-surface-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {PREMIUM_PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-sm text-ink-soft">
                  <CheckIcon className="h-4 w-4 shrink-0 text-keyframe-strong" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Community + access */}
        <section className="wrap py-12 sm:py-16">
          <div
            className="card flex flex-col gap-8 p-6 sm:p-12 lg:flex-row lg:items-center lg:justify-between"
            data-reveal
          >
            <div className="max-w-lg">
              <p className="label label-accent">Community</p>
              <h2 className="section-title mt-3">Get your key in the Discord.</h2>
              <p className="lede mt-4">
                Keys, updates, and support all live in one server. New builds are
                posted there first.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <GetKeyButton source="community" className="w-full sm:w-auto" />
              <DiscordButton className="w-full sm:w-auto" />
              <CopyDiscordButton />
            </div>
          </div>
        </section>

        {/* Changelog */}
        <section id="updates" className="wrap py-12 sm:py-16">
          <SectionHeader label="Updates" title="Latest changes." />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {CHANGELOG.map((entry) => (
              <article key={entry.title} className="card p-6" data-reveal>
                <p className="label label-accent">{entry.tag}</p>
                <h3 className="card-title mt-3">{entry.title}</h3>
                <p className="body-sm mt-2">{entry.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="wrap wrap-narrow py-12 sm:py-16">
          <SectionHeader label="FAQ" title="Before you grab a key." />
          <div className="mt-8" data-reveal>
            <FAQ />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
