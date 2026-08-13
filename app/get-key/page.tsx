"use client";

import { useState } from "react";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/config";

const VERIFY_DURATION = 4500;

export default function GetKeyPage() {
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const startVerification = () => {
    if (started) return;

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
  };

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
            {/* Key icon */}
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
              Join the Zkx Hub Discord to receive updates, support, and script announcements.
            </p>

            {/* Discord button */}
            <a
              href={siteConfig.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              onClick={startVerification}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-[#5865F2]/30 bg-[#5865F2]/10 px-5 py-4 font-display text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5865F2]/60 hover:bg-[#5865F2]/15"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19.27 5.33a16.6 16.6 0 0 0-4.12-1.28l-.51 1.04a15.38 15.38 0 0 0-5.28 0L8.85 4.05a16.6 16.6 0 0 0-4.12 1.28C2.13 8.98 1.43 12.6 1.78 16.17a16.68 16.68 0 0 0 5.08 2.55l1.23-1.68c-.68-.25-1.34-.56-1.96-.92l.48-.37c3.79 1.77 8.35 1.77 12.1 0l.49.37c-.63.36-1.28.67-1.96.92l1.23 1.68a16.68 16.68 0 0 0 5.08-2.55c.4-4.14-.68-7.72-2.03-10.84ZM8.67 13.89c-1.12 0-2.04-1.03-2.04-2.3s.9-2.3 2.04-2.3c1.14 0 2.06 1.03 2.04 2.3 0 1.27-.9 2.3-2.04 2.3Zm6.66 0c-1.12 0-2.04-1.03-2.04-2.3s.9-2.3 2.04-2.3c1.14 0 2.04 1.03 2.04 2.3 0 1.27-.9 2.3-2.04 2.3Z" />
              </svg>

              Join the Zkx Hub Discord
            </a>

            {/* Progress section */}
            {started && (
              <div className="mt-6 rounded-xl border border-surface-border bg-bg/60 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono uppercase tracking-wider text-ink-muted">
                    Preparing access
                  </span>

                  <span className="font-mono text-keyframe">
                    {progress}%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-border">
                  <div
                    className="h-full rounded-full bg-keyframe transition-[width] duration-75 ease-linear"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-xs text-ink-muted">
                  {ready
                    ? "Access is ready. You can continue."
                    : "Please keep this page open while access is prepared."}
                </p>
              </div>
            )}

            {/* Continue button */}
            <button
              type="button"
              onClick={continueToKey}
              disabled={!ready}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-keyframe px-5 py-4 font-display text-sm font-semibold text-bg transition-all duration-200 hover:bg-keyframe-strong disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-keyframe"
            >
              {ready ? "Continue to Key System" : "Continue"}

              {ready && (
                <span aria-hidden="true">
                  →
                </span>
              )}
            </button>

            <p className="mt-5 text-center text-xs leading-5 text-ink-muted">
              The Discord step is required before continuing to the key
              system.
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
