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

    const start = performance.now();

    const update = (now: number) => {
      const elapsed = now - start;
      const nextProgress = Math.min(
        100,
        Math.round((elapsed / VERIFY_DURATION) * 100)
      );

      setProgress(nextProgress);

      if (elapsed < VERIFY_DURATION) {
        requestAnimationFrame(update);
      } else {
        setReady(true);
      }
    };

    requestAnimationFrame(update);
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
                className="h-5 w-5 shrink-0 text-[#7289da]"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19.54 5.16a16.94 16.94 0 0 0-4.16-1.3l-.5 1.03a15.12 15.12 0 0 0-5.76 0l-.5-1.03a16.94 16.94 0 0 0-4.16 1.3C2.2 8.15 1.5 11.1 1.77 14.01c1.27.95 2.5 1.53 3.7 1.9l.9-1.22a8.84 8.84 0 0 1-1.4-.67l.35-.26c2.77 1.3 5.76 1.95 8.68 1.95s5.91-.65 8.68-1.95l.35.26c-.45.26-.92.48-1.4.67l.9 1.22c1.2-.37 2.43-.95 3.7-1.9.27-2.91-.43-5.86-2.23-8.85ZM8.36 12.88c-.85 0-1.54-.77-1.54-1.71s.68-1.72 1.54-1.72 1.54.77 1.54 1.72-.69 1.71-1.54 1.71Zm7.28 0c-.85 0-1.54-.77-1.54-1.71s.68-1.72 1.54-1.72 1.54.77 1.54 1.72-.69 1.71-1.54 1.71Z" />
              </svg>
                <circle
                  cx="8"
                  cy="8"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M11 11l8 8M16 16l2.5 2.5M19 13l2.5 2.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="eyebrow">KEY ACCESS</p>

            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Join Discord to continue.
            </h1>

            <p className="mt-4 text-sm leading-7 text-ink-muted sm:text-base">
              Join the Zkx Hub Discord to receive updates, support, and key
              system announcements.
            </p>

            <a
              href={siteConfig.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              onClick={startVerification}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-[#5865F2]/30 bg-[#5865F2]/10 px-5 py-4 font-display text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5865F2]/60 hover:bg-[#5865F2]/15"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-[#7289da]"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19.54 0c.44 0 .84.25 1.03.64 1.42 2.85 2.1 6.01 1.98 9.19-.02.36-.2.7-.49.93-2.1 1.67-4.52 2.9-7.1 3.61-.29.08-.6.02-.82-.16-.36-.3-.71-.63-1.03-.98-.1-.11-.25-.17-.39-.14-1.8.41-3.66.41-5.46 0-.14-.03-.29.02-.39.14-.32.35-.67.68-1.03.98-.22.18-.53.24-.82.16a20.06 20.06 0 0 1-7.1-3.61c-.29-.23-.47-.57-.49-.93C.1 6.65.78 3.49 2.2.64.39.25.79 0 1.23 0h2.36c.43 0 .83.23 1.04.6.18.32.34.65.49.98a16.53 16.53 0 0 1 9.76 0c.15-.33.31-.66.49-.98.21-.37.61-.6 1.04-.6h2.36ZM8.28 8.82c-1.08 0-1.96.95-1.96 2.11s.88 2.11 1.96 2.11 1.97-.95 1.97-2.11-.89-2.11-1.97-2.11Zm7.44 0c-1.08 0-1.97.95-1.97 2.11s.89 2.11 1.97 2.11 1.96-.95 1.96-2.11-.88-2.11-1.96-2.11Z" />
              </svg>
              Join the Zkx Hub Discord
            </a>

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
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="mt-3 text-xs text-ink-muted">
                  {ready
                    ? "Access is ready. You can continue."
                    : "Please keep this page open while access is prepared."}
                </p>
              </div>
            )}

            <button
              type="button"
              disabled={!ready}
              onClick={() => {
                window.location.href = siteConfig.keySystemUrl;
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-keyframe px-5 py-4 font-display text-sm font-semibold text-bg transition-all duration-200 hover:bg-keyframe-strong disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-keyframe"
            >
              {ready ? "Continue to Key System" : "Continue"}
              {ready && <span aria-hidden="true">→</span>}
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
