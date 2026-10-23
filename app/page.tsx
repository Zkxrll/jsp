import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { NewScriptAnnouncement } from "@/components/new-script-announcement";
import { GetKeyButton } from "@/components/get-key-button";
import { FAQ } from "@/components/faq";
import { FeatureGrid } from "@/components/feature-grid";
import { FeatureTabs } from "@/components/feature-tabs";
import { LibraryPanel } from "@/components/library-panel";
import { CopyDiscordButton } from "@/components/copy-discord-button";
import { DiscordGlyph } from "@/components/discord-glyph";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from "@/components/icons";
import { RouteTransition } from "@/components/route-transition";
import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/lib/config";
import { gameById, gameCountWord, gameNameList, games, type GameId } from "@/lib/games";

const PREMIUM_URL = "https://zkx.mysellauth.com/";

// TODO: give each entry a real version number and release date. Undated
// entries read as filler.
const CHANGELOG: readonly { game: GameId; tag: string; title: string; body: string }[] = [
  {
    game: "steal-an-egg",
    tag: "New script",
    title: "Steal An Egg is here",
    body: "A new script with egg-stealing and hatching automation, pet management, event tools, predictors, and more.",
  },
  {
    game: "rivals",
    tag: "Current build",
    title: "Flickbot feel and Triggerbot checks",
    body: "Flickbot got curvature and humanness sliders so the flick reads like a hand, not a snap. Triggerbot now skips katana deflects and riot shields unless your weapon pierces them.",
  },
  {
    game: "rivals",
    tag: "Previous build",
    title: "World lighting presets",
    body: "Save your bloom, color grading, skybox, and weather setups and load them back next session instead of dialing them in every time.",
  },
];

const PREMIUM_PERKS = [
  "One-time payment",
  "Lifetime access",
  "Priority support in Discord",
  "All future updates",
] as const;

const STEPS = [
  {
    title: "Copy the loader",
    body: "Every game uses the same loadstring. Copy it from the script library.",
  },
  {
    title: "Run it in your executor",
    body: "Paste the loader into your executor and run it while you're in the game.",
  },
  {
    title: "Enter your key",
    body: "Get a free key from the key system when the script asks for one, or pay once for lifetime Premium.",
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
        {/* Hero: the pitch on the left, the library itself on the right. */}
        <section className="pb-4 pt-28 sm:pb-8 sm:pt-32 lg:pt-36">
          <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center">
            <div>
              <p className="label label-accent animate-rise">Roblox script hub</p>

              <h1 className="display animate-rise mt-5" style={{ animationDelay: "40ms" }}>
                One loader. <span className="accent">{gameCountWord()} games.</span>
              </h1>

              <p className="lede animate-rise mt-6 max-w-xl" style={{ animationDelay: "80ms" }}>
                Scripts for {gameNameList()}, all from the same loader. Free with a
                key from the key system, or pay once for lifetime Premium.
              </p>

              <div
                className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "120ms" }}
              >
                <GetKeyButton source="hero" size="lg" className="w-full sm:w-auto" />
                <DiscordButton size="lg" className="w-full sm:w-auto" />
              </div>
            </div>

            <div className="animate-rise min-w-0" style={{ animationDelay: "200ms" }}>
              <LibraryPanel />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="wrap section">
          <SectionHeader label="How it works" title="Running in three steps.">
            The same three steps for every game in the library.
          </SectionHeader>

          <ol className="panel-grid mt-10 sm:mt-12 md:grid-cols-3" data-reveal>
            {STEPS.map((step, index) => (
              <li key={step.title} className="p-6 sm:p-8">
                <span className="font-display text-sm font-extrabold text-keyframe-strong">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="title-md mt-3">{step.title}</h3>
                <p className="body-sm mt-2">{step.body}</p>
              </li>
            ))}
          </ol>

          <Link
            href="/scripts"
            transitionTypes={["nav-forward"]}
            className="btn btn-secondary mt-6 w-full sm:w-auto"
            data-reveal
          >
            Open the script library
            <ArrowRightIcon />
          </Link>
        </section>

        {/* Features */}
        <section id="features" className="wrap section">
          <SectionHeader label="Everything inside" title="What each script does.">
            Pick a game to see its features. Nothing here is a feature the script
            does not have.
          </SectionHeader>

          <div className="mt-10 sm:mt-12" data-reveal>
            <FeatureTabs
              tabs={games.map((game) => ({
                id: game.id,
                label: game.name,
                isNew: game.isNew,
                panel: <FeatureGrid gameId={game.id} />,
              }))}
            />
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
          <div className="panel-grid mt-10 sm:mt-12 md:grid-cols-3" data-reveal>
            {CHANGELOG.map((entry) => (
              <article key={entry.title} className="p-6 sm:p-8">
                <p className="label">
                  <span className="label-accent">{gameById(entry.game).name}</span> · {entry.tag}
                </p>
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
