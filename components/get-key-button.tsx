"use client";

import { useCallback, useRef, useState } from "react";
import { siteConfig } from "@/lib/config";
import { track } from "@/lib/analytics";

type ButtonState = "idle" | "loading" | "error";

const REDIRECT_DELAY_MS = 300;
const DISCORD_URL = "https://discord.com/invite/bxu2WMjNjN";

export function GetKeyButton() {
  const [state, setState] = useState<ButtonState>("idle");
  const [showDiscordModal, setShowDiscordModal] = useState(false);
  const hasFired = useRef(false);

  const handleGetKeyClick = useCallback(() => {
    if (state === "loading") return;

    if (!siteConfig.keySystemUrl) {
      setState("error");
      track({ name: "get_key_blocked_no_url" });
      return;
    }

    setShowDiscordModal(true);
    track({ name: "get_key_clicked" });
  }, [state]);

  const handleContinue = useCallback(() => {
    if (hasFired.current) return;
    hasFired.current = true;

    if (!siteConfig.keySystemUrl) {
      setState("error");
      return;
    }

    setShowDiscordModal(false);
    setState("loading");

    window.setTimeout(() => {
      track({
        name: "get_key_redirected",
        props: {
          destination: siteConfig.keySystemUrl,
        },
      });

      window.location.href = siteConfig.keySystemUrl;
    }, REDIRECT_DELAY_MS);
  }, []);

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
    <>
      <button
        type="button"
        onClick={handleGetKeyClick}
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

            Preparing your key…
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

      {showDiscordModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="discord-gate-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowDiscordModal(false);
            }
          }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-surface-border bg-surface shadow-2xl">
            <div className="border-b border-surface-border px-6 py-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#5865F2]/10 text-[#7289da]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19.54 0c.44 0 .84.25 1.03.64 1.42 2.85 2.1 6.01 1.98 9.19-.02.36-.2.7-.49.93-2.1 1.67-4.52 2.9-7.1 3.61-.29.08-.6.02-.82-.16-.36-.3-.71-.63-1.03-.98-.1-.11-.25-.17-.39-.14-1.8.41-3.66.41-5.46 0-.14-.03-.29.02-.39.14-.32.35-.67.68-1.03.98-.22.18-.53.24-.82.16a20.06 20.06 0 0 1-7.1-3.61c-.29-.23-.47-.57-.49-.93C.1 6.65.78 3.49 2.2.64.39.25.79 0 1.23 0h2.36c.43 0 .83.23 1.04.6.18.32.34.65.49.98a16.53 16.53 0 0 1 9.76 0c.15-.33.31-.66.49-.98.21-.37.61-.6 1.04-.6h2.36ZM8.28 8.82c-1.08 0-1.96.95-1.96 2.11s.88 2.11 1.96 2.11 1.97-.95 1.97-2.11-.89-2.11-1.97-2.11Zm7.44 0c-1.08 0-1.97.95-1.97 2.11s.89 2.11 1.97 2.11 1.96-.95 1.96-2.11-.88-2.11-1.96-2.11Z" />
                </svg>
              </div>

              <h2
                id="discord-gate-title"
                className="font-display text-2xl font-semibold text-ink"
              >
                Join our Discord
              </h2>

              <p className="mt-2 text-sm leading-6 text-ink-muted">
                Join the Zkx Hub Discord before continuing to get your key.
                You&apos;ll find updates, support, and important announcements
                there.
              </p>
            </div>

            <div className="flex flex-col gap-3 p-6 sm:flex-row">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-surface-border bg-bg px-5 py-3 font-display text-sm font-semibold text-ink transition-all duration-200 hover:border-[#5865F2]/50 hover:bg-[#5865F2]/10"
              >
                Join Discord
              </a>

              <button
                type="button"
                onClick={handleContinue}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-keyframe px-5 py-3 font-display text-sm font-semibold text-bg transition-all duration-200 hover:bg-keyframe-strong hover:-translate-y-0.5"
              >
                Continue to Key
                <span className="ml-2">→</span>
              </button>
            </div>

            <div className="px-6 pb-5 text-center text-[11px] text-ink-muted">
              By continuing, you confirm that you&apos;ve joined the Discord
              server.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
