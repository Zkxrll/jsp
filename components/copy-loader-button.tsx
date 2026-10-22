"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";
import { LOADSTRING } from "@/lib/games";

type CopyState = "idle" | "copied" | "failed";

const ANNOUNCEMENT: Record<CopyState, string> = {
  idle: "",
  copied: "Loader copied to clipboard",
  failed: "Couldn't copy. Select the loader text and copy it manually.",
};

/** Copies the shared loadstring. The label swaps in place; width is fixed so nothing shifts. */
export function CopyLoaderButton({ game }: { game: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    let next: CopyState = "copied";
    try {
      await navigator.clipboard.writeText(LOADSTRING);
    } catch {
      next = "failed";
    }

    setState(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 1800);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="btn btn-primary btn-sm min-w-32"
        aria-label={`Copy loader for ${game}`}
      >
        {state === "copied" ? (
          <>
            <CheckIcon /> Copied
          </>
        ) : state === "failed" ? (
          "Copy failed"
        ) : (
          <>
            <CopyIcon /> Copy loader
          </>
        )}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {ANNOUNCEMENT[state]}
      </span>
    </>
  );
}
