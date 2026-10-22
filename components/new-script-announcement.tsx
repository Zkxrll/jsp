"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GameMedia } from "./game-media";
import { ArrowRightIcon, CloseIcon } from "./icons";
import { gameById, scriptsHref } from "@/lib/games";

/** Dismissed once per browser session. */
const DISMISS_KEY = "zkx-steal-an-egg-announcement-dismissed";
/** Matches the closing animation in globals.css (.modal-scrim[data-state="closing"]). */
const CLOSE_MS = 180;

const GAME = gameById("steal-an-egg");

type Phase = "closed" | "open" | "closing";

function focusables(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
  );
}

export function NewScriptAnnouncement() {
  const [phase, setPhase] = useState<Phase>("closed");
  const cardRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rememberDismissal = useCallback(() => {
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Closing still works when storage is unavailable.
    }
  }, []);

  const dismiss = useCallback(() => {
    rememberDismissal();
    setPhase("closing");
    closeTimer.current = setTimeout(() => {
      setPhase("closed");
      returnFocusRef.current?.focus();
    }, CLOSE_MS);
  }, [rememberDismissal]);

  // Show once per session.
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      // If storage is unavailable, still show the announcement for this visit.
    }
    if (dismissed) return;

    const frame = requestAnimationFrame(() => setPhase("open"));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // While open: focus moves into the dialog, Escape closes it, and the
  // page behind it neither scrolls nor takes focus.
  const isOpen = phase === "open";
  useEffect(() => {
    if (!isOpen) return;

    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    cardRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
        return;
      }
      if (event.key !== "Tab" || !cardRef.current) return;

      const items = focusables(cardRef.current);
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === cardRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, dismiss]);

  if (phase === "closed") return null;

  return (
    <div
      className="modal-scrim"
      data-state={phase}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <section
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-script-title"
        aria-describedby="new-script-body"
        tabIndex={-1}
        className="modal-card"
      >
        <button type="button" onClick={dismiss} aria-label="Close announcement" className="modal-close">
          <CloseIcon />
        </button>

        <GameMedia game={GAME} priority sizes="(min-width: 448px) 416px, 100vw" />

        <div className="p-6 sm:p-8">
          <p className="label label-accent">New script</p>
          <h2 id="new-script-title" className="section-title mt-3">
            {GAME.name} is here.
          </h2>
          <p id="new-script-body" className="body-sm mt-3">
            The new {GAME.name} script is now available, with egg-stealing and
            hatching automation, pet management, event tools, predictors, and more.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={scriptsHref(GAME.id)}
              transitionTypes={["nav-forward"]}
              onClick={rememberDismissal}
              className="btn btn-primary w-full sm:w-auto"
            >
              View the script <ArrowRightIcon />
            </Link>
            <button type="button" onClick={dismiss} className="btn btn-secondary w-full sm:w-auto">
              Maybe later
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
