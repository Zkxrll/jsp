"use client";

import { useCallback, useRef, useState } from "react";
import { siteConfig } from "@/lib/config";
import { track } from "@/lib/analytics";

type ButtonState = "idle" | "loading" | "error";

const REDIRECT_DELAY_MS = 200;

export function GetKeyButton() {
  const [state, setState] = useState<ButtonState>("idle");
  const hasFired = useRef(false);

  const handleClick = useCallback(() => {
    if (hasFired.current || state === "loading") return;

    hasFired.current = true;

    if (!siteConfig.keySystemUrl) {
      setState("error");
      track({ name: "get_key_blocked_no_url" });
      return;
    }

    setState("loading");

    track({ name: "get_key_clicked" });

    window.setTimeout(() => {
      track({
        name: "get_key_redirected",
        props: {
          destination: "/get-key",
        },
      });

      window.location.href = "/get-key";
    }, REDIRECT_DELAY_MS);
  }, [state]);

  if (state === "error") {
    return (
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          disabled
          className="inline-flex items-center gap-2 rounded-xl bg-surface px-8 py-4 font-display text-base font-medium text-ink-muted"
        >
          Key system unavailable
        </button>

        <p className="max-w-xs text-center text-xs text-ink-muted">
          NEXT_PUBLIC_KEY_SYSTEM_URL isn&apos;t set. Add it in your environment
          and redeploy.
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={state === "loading"}
      aria-live="polite"
      aria-busy={state === "loading"}
      className="group relative inline-flex items-center gap-2.5 rounded-xl bg-keyframe px-8 py-4 font-display text-base font-semibold text-bg transition-all duration-200 hover:bg-keyframe-strong hover:shadow-[0_0_40px_-8px_var(--color-keyframe)] active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
    >
      {state === "loading" ? (
        <>
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"
            />
          </svg>
          Opening key page…
        </>
      ) : (
        <>
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
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
          Get Key
        </>
      )}
    </button>
  );
}
