"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DiscordGlyph } from "@/components/discord-glyph";
import { siteConfig } from "@/lib/config";

const VERIFY_DURATION = 10000;

type StepState = "idle" | "loading" | "complete";

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m5 12 4 4L19 6" />
  </svg>
);

const Spinner = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 animate-spin" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeOpacity="0.18" strokeWidth="2.5" />
    <path d="M20 12a8 8 0 0 1-8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export default function GetKeyPage() {
  const [state, setState] = useState<StepState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const startVerification = () => {
    if (state !== "idle") return;

    setState("loading");
    timer.current = setTimeout(() => {
      setState("complete");
      timer.current = null;
    }, VERIFY_DURATION);
  };

  const ready = state === "complete";

  const continueToKey = () => {
    if (!ready) return;
    window.location.href = siteConfig.keySystemUrl;
  };

  return (
    <div className="site-shell relative flex min-h-dvh flex-col overflow-hidden">
      <div className="grid-overlay" aria-hidden="true" />

      <SiteHeader />

      <main className="relative z-10 flex flex-1 items-center justify-center px-5 py-16 sm:px-8">
        <section className="w-full max-w-xl">
          <div className="card animate-rise p-6 sm:p-8">
            <p className="eyebrow">Zkx Hub / Access</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">
              Unlock your <span className="accent">access.</span>
            </h1>
            <p className="lede mt-4">
              Open the Zkx Hub Discord below. The step runs a short check, then the
              continue button unlocks and takes you to the key system.
            </p>

            {/* Verification step */}
            <a
              href={siteConfig.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              onClick={startVerification}
              className={`mt-8 block rounded-[var(--radius)] border p-4 transition-colors duration-200 ${
                state === "idle"
                  ? "border-surface-border bg-surface-2 hover:border-surface-border-strong"
                  : "border-surface-border-strong bg-surface-2"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius)] border border-surface-border-strong bg-surface text-keyframe-strong">
                  {state === "loading" ? (
                    <Spinner />
                  ) : state === "complete" ? (
                    <CheckIcon />
                  ) : (
                    <DiscordGlyph className="h-5 w-5" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-black text-ink">Zkx Hub Discord</p>
                  <p className="mt-0.5 truncate text-xs text-ink-muted">
                    {state === "complete"
                      ? "Verification complete"
                      : state === "loading"
                        ? "Checking..."
                        : "Open the invite in a new tab"}
                  </p>
                </div>
              </div>
            </a>

            <button
              type="button"
              onClick={continueToKey}
              disabled={!ready}
              className={`btn mt-4 w-full ${
                ready
                  ? "btn-primary"
                  : "cursor-not-allowed border border-surface-border bg-surface-2 text-ink-muted"
              }`}
            >
              {ready ? "Continue to Key System" : "Complete the step above"}
            </button>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-surface-border pt-5">
              <p className="text-xs leading-5 text-ink-muted">
                Discord verification unlocks access to the key system.
              </p>
              <Link
                href="/"
                className="shrink-0 text-xs font-bold uppercase tracking-[0.1em] text-ink-muted transition-colors hover:text-ink"
              >
                Back
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
