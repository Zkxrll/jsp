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
    track({ name: "get_key_redirected", props: { destination: "/get-key" } });

    // No loading/disabled state: ad scripts can open a separate tab, and the
    // homepage must stay clickable when the user closes that tab and returns.
    window.location.href = "/get-key";
  }, []);

  if (state === "error") {
    return (
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => setState("idle")}
          className="btn btn-ghost w-full sm:w-auto"
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
      className="btn btn-primary w-full sm:w-auto"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
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
