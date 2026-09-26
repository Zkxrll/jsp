import { SiteFooter } from "@/components/site-footer";
import { GetKeyButton } from "@/components/get-key-button";
import { FAQ } from "@/components/faq";
import { FeatureGrid } from "@/components/feature-grid";
import { MenuPreview } from "@/components/menu-preview";
import { CopyDiscordButton } from "@/components/copy-discord-button";
import { DiscordGlyph } from "@/components/discord-glyph";
import { ArrowUpRightIcon, CheckIcon } from "@/components/icons";
import { RouteTransition } from "@/components/route-transition";
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

/** Section heading, identical everywhere: label, title, optional lede. */
function SectionHeader({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl text-center" data-reveal>
      <p className="label label-accent">{label}</p>
      <h2 className="section-title mt-4">{title}</h2>
      {children && <p className="lede mt-4">{children}</p>}
    </div>
  );
}

function DiscordButton({ size = "md", className = "" }: { size?: "md" | "lg"; className?: string }) {
  return (
    <a
      href={siteConfig.links.discord}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-glass ${size === "lg" ? "btn-lg" : ""} ${className}`}
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
        {/* Hero */}
        <section className="pb-16 pt-32 sm:pb-24 sm:pt-40">
          <div className="hero-copy wrap text-center">
            <p className="chip animate-rise">Built for Roblox Rivals</p>

            <h1 className="display animate-rise mt-6" style={{ animationDelay: "40ms" }}>
              The full <span className="text-gradient">Rivals</span> menu.
            </h1>

            <p className="lede animate-rise mx-auto mt-6 max-w-2xl" style={{ animationDelay: "80ms" }}>
              Silent and camera aim, voidspam antihit, weapon mods, ESP, chams, and
              a full world editor. Free with a key from the Discord, or pay once
              for lifetime Premium.
            </p>

            <div
              className="animate-rise mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ animationDelay: "120ms" }}
            >
              <GetKeyButton source="hero" size="lg" morph className="w-full sm:w-auto" />
              <DiscordButton size="lg" className="w-full sm:w-auto" />
            </div>
          </div>

          <div className="wrap mt-16 sm:mt-24">
            <div className="hero-window mx-auto max-w-4xl">
              <div className="animate-rise" style={{ animationDelay: "200ms" }}>
                <MenuPreview />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="wrap py-16 sm:py-24">
          <SectionHeader label="Everything inside" title="What the menu does.">
            {`${features.length} feature groups, pulled straight from the in-game menu. Nothing here is a feature the script does not have.`}
          </SectionHeader>

          <div className="mt-12 sm:mt-16">
            <FeatureGrid />
          </div>
        </section>

        {/* Defense */}
        <section className="wrap py-16 sm:py-24">
          <SectionHeader label="Defense" title="Most scripts stop at silent aim.">
            Zkx Hub ships a working antihit, with anti-aim running on top of it.
          </SectionHeader>

          <div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2">
            {DEFENSE.map((item) => (
              <article key={item.title} className="card p-8" data-reveal data-spotlight>
                <h3 className="section-title">{item.title}</h3>
                <p className="lede mt-4">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Premium */}
        <section id="premium" className="wrap py-16 sm:py-24">
          <div className="card overflow-hidden p-8 sm:p-12" data-reveal data-spotlight>
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-keyframe/20 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="label label-accent">Premium</p>
                <h2 className="section-title mt-4">One purchase. No subscription.</h2>
                <p className="lede mt-4">
                  Premium is a single payment that stays yours. No monthly key, no
                  renewal, and every future update is included.
                </p>
              </div>

              <div>
                <ul className="grid gap-4">
                  {PREMIUM_PERKS.map((perk) => (
                    <li key={perk} className="flex items-center gap-3 text-ink">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-keyframe/15 text-keyframe-strong">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href={PREMIUM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg mt-8 w-full sm:w-auto"
                >
                  Get lifetime Premium
                  <ArrowUpRightIcon />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="wrap py-16 sm:py-24">
          <SectionHeader label="Community" title="Get your key in the Discord.">
            Keys, updates, and support all live in one server. New builds are posted
            there first.
          </SectionHeader>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" data-reveal>
            <GetKeyButton source="community" className="w-full sm:w-auto" />
            <DiscordButton className="w-full sm:w-auto" />
            <CopyDiscordButton />
          </div>
        </section>

        {/* Updates */}
        <section id="updates" className="wrap py-16 sm:py-24">
          <SectionHeader label="Updates" title="Latest changes." />
          <div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2">
            {CHANGELOG.map((entry) => (
              <article key={entry.title} className="card p-8" data-reveal data-spotlight>
                <p className="label label-accent">{entry.tag}</p>
                <h3 className="title-sm mt-4">{entry.title}</h3>
                <p className="body-sm mt-2">{entry.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="wrap wrap-narrow py-16 sm:py-24">
          <SectionHeader label="FAQ" title="Before you grab a key." />
          <div className="mt-12" data-reveal>
            <FAQ />
          </div>
        </section>
      </main>

      <SiteFooter />
    </RouteTransition>
  );
}
