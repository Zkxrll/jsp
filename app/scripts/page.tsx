"use client";

import { useState } from "react";
import { RouteTransition } from "@/components/route-transition";
import { SiteFooter } from "@/components/site-footer";
import { ArrowUpRightIcon, CheckIcon } from "@/components/icons";

const SOURCE_URL = "https://raw.githubusercontent.com/ZkxrI/ZkxHub/refs/heads/main/source";
const LOADSTRING = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/ZkxrI/ZkxHub/refs/heads/main/source"))()';

const SCRIPTS = [
  { name: "Rivals", category: "FPS", description: "Script for Roblox Rivals." },
  { name: "Sniper Duels", category: "FPS", description: "Script for Roblox Sniper Duels." },
  { name: "Steal An Egg", category: "SIMULATOR", description: "Script for Steal An Egg." },
] as const;

function CopyButton() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(LOADSTRING);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" onClick={copy} className="btn btn-primary w-full">
      {copied ? <><CheckIcon /> Copied</> : <>Copy loadstring</>}
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
            <h1 className="display mt-4">All scripts. <span className="text-gradient">One hub.</span></h1>
            <p className="lede mx-auto mt-5 max-w-xl">
              Browse the available game scripts and copy the shared loader when you’re ready.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-keyframe" />
              {SCRIPTS.length} scripts listed
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {SCRIPTS.map((script) => (
              <article key={script.name} className="card flex flex-col p-6" data-reveal data-spotlight>
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-keyframe/20 bg-keyframe/10 text-sm font-bold text-keyframe-strong">
                    {script.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                  </div>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-muted">
                    {script.category}
                  </span>
                </div>
                <h2 className="title-sm mt-6">{script.name}</h2>
                <p className="body-sm mt-2 flex-1">{script.description}</p>
                <div className="mt-6 rounded-lg border border-white/10 bg-black/20 p-3">
                  <p className="label label-accent mb-2">LOADSTRING</p>
                  <code className="block break-all text-xs leading-relaxed text-ink/75">
                    {LOADSTRING}
                  </code>
                </div>
                <div className="mt-4">
                  <CopyButton />
                </div>
              </article>
            ))}
          </div>

          <div className="card mx-auto mt-8 flex max-w-5xl flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6" data-reveal>
            <div>
              <p className="title-sm">Source</p>
              <p className="body-sm mt-1 break-all">Hosted from the ZkxHub GitHub repository.</p>
            </div>
            <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-glass shrink-0">
              View source <ArrowUpRightIcon />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </RouteTransition>
  );
}
