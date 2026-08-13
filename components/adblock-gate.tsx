"use client";

import { useEffect, useState } from "react";

function checkAdBlock(): boolean {
  const bait = document.createElement("div");

  bait.className =
    "ad advertisement adsbox ad-banner ad-container pub_300x250 text-ad";
  bait.setAttribute("aria-hidden", "true");

  bait.style.position = "absolute";
  bait.style.left = "-10000px";
  bait.style.top = "-10000px";
  bait.style.width = "1px";
  bait.style.height = "1px";
  bait.style.pointerEvents = "none";

  document.body.appendChild(bait);

  const blocked =
    bait.offsetParent === null ||
    bait.offsetHeight === 0 ||
    bait.offsetWidth === 0;

  bait.remove();

  return blocked;
}

export function AdBlockGate() {
  const [checking, setChecking] = useState(true);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const runCheck = () => {
      const result = checkAdBlock();

      setBlocked(result);
      setChecking(false);
    };

    // Let the ad scripts/content finish initializing first.
    const timer = window.setTimeout(runCheck, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  if (checking || !blocked) {
    return null;
  }

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="adblock-title"
      className="fixed inset-0 z-[99999] flex min-h-screen items-center justify-center bg-[#05070b]/95 px-6 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-2xl border border-surface-border bg-surface p-7 text-center shadow-2xl sm:p-9">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-keyframe/20 bg-keyframe/10 text-2xl text-keyframe">
          ⚠
        </div>

        <p className="eyebrow mt-6">ACCESS BLOCKED</p>

        <h1
          id="adblock-title"
          className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink"
        >
          Ad blocker detected
        </h1>

        <p className="mt-4 text-sm leading-7 text-ink-muted">
          Please disable your ad blocker to access Zkx Hub. Our ads help
          support the project and keep the service available.
        </p>

        <div className="mt-6 rounded-xl border border-surface-border bg-bg/70 p-4 text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-danger" />
            <span className="text-sm font-medium text-ink">
              Ad blocker is active
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-ink-muted">
            Disable your ad blocker for this website, then reload the page.
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
