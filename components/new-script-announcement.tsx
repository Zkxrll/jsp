"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";

const DISMISS_KEY = "zkx-steal-an-egg-announcement-dismissed";

export function NewScriptAnnouncement() {
  const [open, setOpen] = useState(false);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Closing still works when storage is unavailable.
    }
  }, []);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      // If storage is unavailable, still show the announcement for this visit.
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-script-title"
        className="card relative w-full max-w-lg overflow-hidden p-6 shadow-2xl sm:p-8"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-keyframe/20 blur-3xl"
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={dismiss}
          aria-label="Close announcement"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-lg text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
        >
          ×
        </button>

        <div className="relative">
          <p className="label label-accent">NEW SCRIPT AVAILABLE</p>
          <h2 id="new-script-title" className="section-title mt-4">
            Steal An Egg is here.
          </h2>
          <p className="body-sm mt-3">
            The new Steal An Egg script is now available, with egg-stealing and
            hatching automation, pet management, event tools, predictors, and more.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/scripts#steal-an-egg"
              onClick={dismiss}
              className="btn btn-primary w-full sm:w-auto"
            >
              Check it out <ArrowUpRightIcon />
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="btn btn-glass w-full sm:w-auto"
            >
              Maybe later
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
