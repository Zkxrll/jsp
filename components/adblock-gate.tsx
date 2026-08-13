"use client";

import { useEffect, useState } from "react";

export function AdBlockGate() {
  const [blocked, setBlocked] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdBlock = () => {
      const script = document.getElementById("monetag-ad");

      // If the script hasn't even been created yet, wait a little longer.
      if (!script) {
        setTimeout(checkAdBlock, 1000);
        return;
      }

      let finished = false;

      const fail = () => {
        if (finished) return;
        finished = true;
        setBlocked(true);
        setChecking(false);
      };

      const success = () => {
        if (finished) return;
        finished = true;
        setBlocked(false);
        setChecking(false);
      };

      script.addEventListener("error", fail, { once: true });
      script.addEventListener("load", success, { once: true });

      // Brave/ad blockers can silently prevent a script from loading,
      // so don't wait forever.
      setTimeout(() => {
        if (finished) return;

        // Check whether the script finished loading.
        if (script instanceof HTMLScriptElement && script.src) {
          // If the browser didn't load it, treat it as blocked.
          const scripts = Array.from(document.scripts);
          const monetagScript = scripts.find((s) =>
            s.src.includes("quge5.com/88/tag.min.js")
          );

          if (!monetagScript) {
            fail();
            return;
          }

          // The script element exists, but we need one more check.
          // If the ad provider hasn't initialized after this delay,
          // assume it was blocked.
          fail();
        }
      }, 3000);

      return () => {
        script.removeEventListener("error", fail);
        script.removeEventListener("load", success);
      };
    };

    const timer = window.setTimeout(checkAdBlock, 1500);

    return () => window.clearTimeout(timer);
  }, []);

  if (checking || !blocked) {
    return null;
  }

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      className="fixed inset-0 z-[99999] flex min-h-screen items-center justify-center bg-[#05070b]/95 px-6"
    >
      <div className="w-full max-w-md rounded-2xl border border-surface-border bg-surface p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-keyframe/10 text-2xl text-keyframe">
          ⚠
        </div>

        <p className="eyebrow mt-6">ACCESS BLOCKED</p>

        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
          Ad blocker detected
        </h1>

        <p className="mt-4 text-sm leading-6 text-ink-muted">
          Please disable your ad blocker for Zkx Hub. Ads help support the
          project and keep the service available.
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 w-full rounded-xl bg-keyframe px-5 py-4 font-display text-sm font-semibold text-bg transition hover:bg-keyframe-strong"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
