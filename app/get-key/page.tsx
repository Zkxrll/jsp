"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/config";

const VERIFY_DURATION = 10000;
const REQUIRED_SERVERS = 2;

export default function GetKeyPage() {
  const [joinedServers, setJoinedServers] = useState<boolean[]>([false, false]);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const markServerClicked = (index: number) => {
    setJoinedServers((current) => {
      if (current[index]) return current;
      const next = [...current];
      next[index] = true;
      return next;
    });
  };

  useEffect(() => {
    if (joinedServers.filter(Boolean).length !== REQUIRED_SERVERS || started) return;

    setStarted(true);
    setProgress(0);
    setReady(false);

    const startTime = performance.now();

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const nextProgress = Math.min(
        100,
        Math.round((elapsed / VERIFY_DURATION) * 100)
      );

      setProgress(nextProgress);

      if (elapsed < VERIFY_DURATION) {
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setReady(true);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [joinedServers, started]);

  const continueToKey = () => {
    if (!ready) return;
    window.location.href = siteConfig.keySystemUrl;
  };

  return (
    <div className="site-shell relative min-h-dvh overflow-hidden">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <SiteHeader />

      <main className="relative z-10 flex min-h-[calc(100dvh-160px)] items-center justify-center px-6 py-16">
        <section className="w-full max-w-xl">
          <div className="animate-rise rounded-2xl border border-surface-border bg-surface p-7 shadow-2xl sm:p-9">
            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl border border-keyframe/20 bg-keyframe/10 text-keyframe">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="4" />
                <path d="M11 11l8 8" />
                <path d="M16 16l2.5 2.5" />
                <path d="M19 13l2.5 2.5" />
              </svg>
            </div>

            <p className="eyebrow">KEY ACCESS</p>

            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Join Discord to continue.
            </h1>

            <p className="mt-4 text-sm leading-7 text-ink-muted sm:text-base">
              Join both Discord servers below to receive updates, support, and script announcements.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={siteConfig.links.discord}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => markServerClicked(0)}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#5865F2]/30 bg-[#5865F2]/10 px-5 py-4 font-display text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5865F2]/60 hover:bg-[#5865F2]/15"
              >
                <span className="text-lg" aria-hidden="true">◎</span>
                {joinedServers[0] ? "✓ Zkx Hub Discord opened" : "Join the Zkx Hub Discord"}
              </a>

              <a
                href="https://discord.gg/fhpaqqu3f"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => markServerClicked(1)}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#5865F2]/30 bg-[#5865F2]/10 px-5 py-4 font-display text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5865F2]/60 hover:bg-[#5865F2]/15"
              >
                <span className="text-lg" aria-hidden="true">◎</span>
                {joinedServers[1] ? "✓ Second Discord opened" : "Join the second Discord server"}
              </a>
            </div>

            {started && (
              <div className="mt-6 rounded-xl border border-surface-border bg-bg/60 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono uppercase tracking-wider text-ink-muted">
                    Preparing access
                  </span>
                  <span className="font-mono text-keyframe">{progress}%</span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-border">
                  <div
                    className="h-full rounded-full bg-keyframe transition-[width] duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="mt-3 text-xs text-ink-muted">
                  {ready
                    ? "Both Discord steps are complete. You can continue."
                    : "Both Discord links were opened. Please keep this page open while access is prepared."}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={continueToKey}
              disabled={!ready}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-keyframe px-5 py-4 font-display text-sm font-semibold text-bg transition-all duration-200 hover:bg-keyframe-strong disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-keyframe"
            >
              {ready ? "Continue to Key System" : "Continue"}
              {ready && <span aria-hidden="true">→</span>}
            </button>

            <p className="mt-5 text-center text-xs leading-5 text-ink-muted">
              Both Discord steps are required before continuing to the key system.
            </p>

            <Link
              href="/"
              className="mt-5 block text-center text-xs text-ink-muted transition-colors hover:text-ink"
            >
              ← Back to Zkx Hub
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
