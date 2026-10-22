"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

const LOADER =
  'loadstring(game:HttpGet("https://raw.githubusercontent.com/ZkxrI/ZkxHub/refs/heads/main/source"))()';

const SCRIPTS = [
  {
    id: "rivals",
    name: "Rivals",
    subtitle: "Roblox Rivals",
    mark: "R",
  },
  {
    id: "sniper-duels",
    name: "Sniper Duels",
    subtitle: "Roblox Sniper Duels",
    mark: "SD",
  },
  {
    id: "steal-an-egg",
    name: "Steal An Egg",
    subtitle: "Roblox Steal An Egg",
    mark: "SE",
  },
] as const;

export function ScriptLibrary() {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  async function copyLoader(scriptId: string) {
    try {
      await navigator.clipboard.writeText(LOADER);
      setCopyStatus(scriptId);
    } catch {
      setCopyStatus(`error:${scriptId}`);
    }
  }

  return (
    <section className="wrap pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div className="mx-auto max-w-2xl text-center" data-reveal>
        <p className="label label-accent">Script library</p>
        <h1 className="display mt-4">
          Pick your <span className="text-gradient">game.</span>
        </h1>
        <p className="lede mx-auto mt-6 max-w-2xl">
          Browse the available Zkx Hub scripts and copy the loader for your game.
          All three entries currently use the same source URL.
        </p>
        <div className="mt-6 flex justify-center">
          <span className="chip">3 games · 1 shared loader</span>
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {SCRIPTS.map((script) => {
          const copied = copyStatus === script.id;
          const failed = copyStatus === `error:${script.id}`;

          return (
            <article
              key={script.id}
              className="card flex min-w-0 flex-col p-6 sm:p-7"
              data-reveal
              data-spotlight
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-sm font-bold tracking-wide text-keyframe-strong">
                  {script.mark}
                </div>
                <span className="chip">Available</span>
              </div>

              <div className="mt-6">
                <h2 className="title-sm">{script.name}</h2>
                <p className="body-sm mt-1">{script.subtitle}</p>
              </div>

              <div className="mt-5 rounded-2xl border border-white/[0.08] bg-black/25 p-3">
                <p className="label mb-2">Loader</p>
                <code className="block break-all font-mono text-xs leading-5 text-ink-soft">
                  {LOADER}
                </code>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => void copyLoader(script.id)}
                  className="btn btn-primary btn-sm w-full"
                  aria-label={`Copy loader for ${script.name}`}
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  {copied ? "Copied" : failed ? "Copy failed — try again" : "Copy loader"}
                </button>
                <p className="body-sm mt-3 text-center" aria-live="polite">
                  {copied
                    ? "Loader copied to clipboard."
                    : failed
                      ? "Clipboard access was blocked by the browser."
                      : "Copies the shared loader for this game."}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <p className="body-sm mx-auto mt-8 max-w-2xl text-center">
        Only run scripts you trust. The loader fetches code from the linked source,
        so the code served by that source can change independently of this page.
      </p>
    </section>
  );
}
