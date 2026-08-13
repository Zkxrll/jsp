"use client";

import { useEffect, useState } from "react";
import { DetectAdblock } from "@scthakuri/adblock-detector";

export function AdBlockGate() {
  const [checking, setChecking] = useState(true);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    let mounted = true;

    DetectAdblock((detected: boolean) => {
      if (!mounted) return;

      setBlocked(detected);
      setChecking(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (checking || !blocked) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[99999] flex min-h-dvh items-center justify-center bg-[#05070b]/95 px-6"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="adblock-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-surface-border bg-surface p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-keyframe/10 text-2xl text-keyframe">
          ⚠
        </div>

        <p className="eyebrow mt-6">ACCESS BLOCKED</p>

        <h1
          id="adblock-title"
          className="mt-2 font-display text-3xl font-semibold text-ink"
        >
          Ad blocker detected
        </h1>

        <p className="mt-4 text-sm leading-6 text-ink-muted">
          Please disable your ad blocker for Zkx Hub. Ads help support the
          project and keep the site available.
        </p>

        <div className="mt-6 rounded-xl border border-surface-border bg-bg/60 p-4 text-left">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-danger" />
            <span className="text-sm font-medium text-ink">
              Ad blocker is enabled
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-ink-muted">
            Disable it for this website, then reload the page.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 w-full rounded-xl bg-keyframe px-5 py-4 font-display text-sm font-semibold text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-keyframe-strong"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
