import { SiteFooter } from "@/components/site-footer";
import { NewScriptAnnouncement } from "@/components/new-script-announcement";
import { GetKeyButton } from "@/components/get-key-button";
import { FAQ } from "@/components/faq";
import { FeatureGrid } from "@/components/feature-grid";
import { MenuPreview } from "@/components/menu-preview";
import { CopyDiscordButton } from "@/components/copy-discord-button";
import { DiscordGlyph } from "@/components/discord-glyph";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from "@/components/icons";
import { RouteTransition } from "@/components/route-transition";
import { GameTiles } from "@/components/game-tiles";
import { SectionHeader } from "@/components/section-header";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { features } from "@/lib/features";

const PREMIUM_URL = "https://zkx.mysellauth.com/";

// TODO: give each entry a real version number and release date. Undated
// entries read as filler.
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

const DEFENSE = [
  {
    title: "Voidspam",
    body: "Teleports the root you replicate far into the void on every server tick, so the shots people land hit a copy that is not where you are standing.",
  },
  {
    title: "Anti-Aim",
    body: "Spoofs the yaw you send with spin, jitter, or a fake backwards facing, and can forge the server look angle so peek logic and aim assists resolve the wrong way.",
  },
] as const;

function DiscordButton({ size = "md", className = "" }: { size?: "md" | "lg"; className?: string }) {
  return (
    <a
      href={siteConfig.links.discord}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-secondary ${size === "lg" ? "btn-lg" : ""} ${className}`}
    >
      <DiscordGlyph />
      Join Discord
    </a>
  );
}

export default function HomePage() {
  return (
    <RouteTransition>
      <main className="flex-1">
        {/* Hero: the pitch on the left, the menu itself on the right. */}
        <section className="pb-4 pt-28 sm:pb-8 sm:pt-32 lg:pt-36">
          <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
            <div>
              <p className="label label-accent animate-rise">Built for Roblox Rivals</p>

              <h1 className="display animate-rise mt-5" style={{ animationDelay: "40ms" }}>
                The full <span className="accent">Rivals</span> menu.
              </h1>

              <p className="lede animate-rise mt-6 max-w-xl" style={{ animationDelay: "80ms" }}>
                Silent and camera aim, voidspam antihit, weapon mods, ESP, chams, and
                a full world editor. Free with a key from the key system, or pay once
                for lifetime Premium.
              </p>

              <div
                className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "120ms" }}
              >
                <GetKeyButton source="hero" size="lg" className="w-full sm:w-auto" />
                <DiscordButton size="lg" className="w-full sm:w-auto" />
              </div>

              <p className="body-sm animate-rise mt-6" style={{ animationDelay: "160ms" }}>
                Also for Sniper Duels and Steal An Egg.{" "}
                <Link
                  href="/scripts"
                  transitionTypes={["nav-forward"]}
                  className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-keyframe"
                >
                  See all scripts
                </Link>
              </p>
            </div>

            <div className="animate-rise min-w-0" style={{ animationDelay: "200ms" }}>
              <MenuPreview />
            </div>
          </div>
        </section>

        {/* Script library */}
        <section className="wrap section">
          <SectionHeader label="Script library" title="Three games. One loader.">
            Every script loads from the same source. Pick a game to see what it
            covers and copy its loader.
          </SectionHeader>

          <div className="mt-10 sm:mt-12">
            <GameTiles />
          </div>
        </section>

        {/* Features */}
        <section id="features" className="wrap section">
          <SectionHeader label="Everything inside" title="What the menu does.">
            {`${features.length} feature groups, pulled straight from the in-game menu. Nothing here is a feature the script does not have.`}
          </SectionHeader>

          <div className="mt-10 sm:mt-12">
            <FeatureGrid />
          </div>
        </section>

        {/* Defense */}
        <section className="wrap section">
          <SectionHeader label="Defense" title="Most scripts stop at silent aim.">
            Zkx Hub ships a working antihit, with anti-aim running on top of it.
          </SectionHeader>

          <div className="panel-grid mt-10 sm:mt-12 md:grid-cols-2" data-reveal>
            {DEFENSE.map((item) => (
              <article key={item.title} className="p-6 sm:p-8">
                <h3 className="title-md">{item.title}</h3>
                <p className="lede mt-3">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Premium */}
        <section id="premium" className="wrap section">
          <div className="card grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-12" data-reveal>
            <div>
              <p className="label label-accent">Premium</p>
              <h2 className="section-title mt-4">One purchase. No subscription.</h2>
              <p className="lede mt-4">
                Premium is a single payment that stays yours. No monthly key, no
                renewal, and every future update is included.
              </p>
            </div>

            <div>
              <ul className="panel-grid sm:grid-cols-2">
                {PREMIUM_PERKS.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 px-4 py-4 text-ink">
                    <CheckIcon className="h-4 w-4 shrink-0 text-keyframe-strong" />
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href={PREMIUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg mt-6 w-full sm:w-auto"
              >
                Get lifetime Premium
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="wrap section">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between" data-reveal>
            <div className="max-w-xl">
              <p className="label label-accent">Community</p>
              <h2 className="section-title mt-4">Join the community.</h2>
              <p className="lede mt-4">
                Discord is where updates and support live. New builds are posted there
                first.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <GetKeyButton source="community" className="w-full sm:w-auto" />
              <DiscordButton className="w-full sm:w-auto" />
              <CopyDiscordButton />
            </div>
          </div>
        </section>

        {/* Updates */}
        <section id="updates" className="wrap section">
          <SectionHeader label="Updates" title="Latest changes." />
          <div className="panel-grid mt-10 sm:mt-12 md:grid-cols-2" data-reveal>
            {CHANGELOG.map((entry) => (
              <article key={entry.title} className="p-6 sm:p-8">
                <p className="label label-accent">{entry.tag}</p>
                <h3 className="title-sm mt-3">{entry.title}</h3>
                <p className="body-sm mt-2">{entry.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="wrap section">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <div data-reveal>
              <p className="label label-accent">FAQ</p>
              <h2 className="section-title mt-4">Before you grab a key.</h2>
              <p className="body-sm mt-4">
                Something not covered here?{" "}
                <a
                  href={siteConfig.links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-keyframe"
                >
                  Ask in the Discord
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              </p>
            </div>
            <div data-reveal>
              <FAQ />
            </div>
          </div>
        </section>
      </main>

      <NewScriptAnnouncement />
      <SiteFooter />
    </RouteTransition>
  );
}
