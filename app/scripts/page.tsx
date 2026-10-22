"use client";

import { useState } from "react";
import { RouteTransition } from "@/components/route-transition";
import { SiteFooter } from "@/components/site-footer";
import { CheckIcon, CopyIcon } from "@/components/icons";

const LOADSTRING = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/ZkxrI/ZkxHub/refs/heads/main/source"))()';

const SCRIPTS = [
  {
    name: "Rivals",
    label: "01 / FPS",
    description:
      "Combat tools include configurable aimbot modes and triggerbot, weapon tweaks, player ESP, chams and tracers, custom crosshairs, hit feedback, world visuals, and gameplay automation.",
  },
  {
    name: "Sniper Duels",
    label: "02 / FPS",
    description:
      "Includes player ESP with boxes, names, health and optional tracers, plus configurable aimbot, FOV and visibility checks, speed controls, and noclip.",
  },
  {
    name: "Steal An Egg",
    label: "03 / GAME",
    description:
      "Automation for stealing, placing, hatching, and selling eggs or pets, plus mutations, fusing, event helpers, player options, ESP, egg predictors, and server hopping.",
  },
] as const;

function CopyButton({ game }: { game: string }) {
  const [status, setStatus] = useState<"copied" | "error" | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(LOADSTRING);
      setStatus("copied");
      window.setTimeout(() => setStatus(null), 1800);
    } catch {
      setStatus("error");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="btn btn-primary btn-sm w-full sm:w-auto"
      aria-label={`Copy loader for ${game}`}
    >
      {status === "copied" ? (
        <><CheckIcon /> Copied</>
      ) : status === "error" ? (
        <>Clipboard unavailable</>
      ) : (
        <><CopyIcon /> Copy loader</>
      )}
    </button>
  );
}

export default function ScriptsPage() {
  return (
    <RouteTransition>
      <main className="flex-1">
        <section className="wrap pb-16 pt-32 sm:pb-24 sm:pt-40">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <p className="label label-accent">SCRIPT LIBRARY</p>
            <h1 className="display mt-4">
              Pick a game. <span className="text-gradient">Copy the script.</span>
            </h1>
            <p className="lede mx-auto mt-5 max-w-2xl">
              A quick overview of each game, followed by the loader you can copy
              straight from the page. Every entry currently uses the same source.
            </p>
            <div className="mt-6 flex justify-center">
              <span className="chip">3 game entries · shared loader</span>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.015] sm:mt-16">
            {SCRIPTS.map((script, index) => (
              <article
                key={script.name}
                className="grid gap-5 border-b border-white/[0.08] p-5 last:border-b-0 sm:p-7 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-center md:gap-8"
                data-reveal
              >
                <div className="min-w-0">
                  <p className="label label-accent">{script.label}</p>
                  <h2 className="title-sm mt-3">{script.name}</h2>
                  <p className="body-sm mt-2 max-w-md">{script.description}</p>
                </div>

                <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-black/25 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="label">LOADSTRING</p>
                    <span className="text-xs text-ink-muted">Shared source</span>
                  </div>
                  <code className="block break-all font-mono text-xs leading-5 text-ink-soft">
                    {LOADSTRING}
                  </code>
                  <div className="mt-4 flex justify-end">
                    <CopyButton game={script.name} />
                  </div>
                </div>
              </article>
            ))}
          </div>

        </section>
      </main>
      <SiteFooter />
    </RouteTransition>
  );
}
