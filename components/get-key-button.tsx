"use client";

import { useCallback, useState } from "react";
import { siteConfig } from "@/lib/config";
import { track } from "@/lib/analytics";

type ButtonState = "idle" | "error";

export function GetKeyButton() {
  const [state, setState] = useState<ButtonState>("idle");

  const handleClick = useCallback(() => {
    if (!siteConfig.keySystemUrl) {
      setState("error");
      track({ name: "get_key_blocked_no_url" });
      return;
    }

    track({ name: "get_key_clicked" });
    track({
      name: "get_key_redirected",
      props: {
        destination: "/get-key",
      },
    });

    // Do not keep a loading/disabled state here. Ad scripts can open a
    // separate tab on Safari; the original page must remain clickable when
    // the user closes that tab and returns to the homepage.
    window.location.href = "/get-key";
  }, []);

  if (state === "error") {
    return (
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => setState("idle")}
          className="inline-flex items-center gap-2 rounded-xl bg-surface px-8 py-4 font-display text-base font-medium text-ink-muted transition-colors hover:text-ink"
        >
          Key system unavailable
        </button>

        <p className="max-w-xs text-center text-xs text-ink-muted">
          NEXT_PUBLIC_KEY_SYSTEM_URL isn&apos;t configured.
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-live="polite"
      className="group relative inline-flex min-w-[150px] items-center justify-center gap-2.5 rounded-xl bg-keyframe px-8 py-4 font-display text-base font-semibold text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-keyframe-strong hover:shadow-[0_0_32px_-10px_var(--color-keyframe)] active:translate-y-0 active:scale-[0.98]"
    >
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
    </button>
  );
}
