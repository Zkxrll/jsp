"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/config";
import { CheckIcon, CopyIcon } from "./icons";

type CopyState = "idle" | "copied" | "failed";

const ANNOUNCEMENT: Record<CopyState, string> = {
  idle: "",
  copied: "Discord invite link copied",
  failed: "Couldn't copy the invite link. Use Join Discord instead.",
};

export function CopyDiscordButton() {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copyInvite() {
    let next: CopyState = "copied";
    try {
      await navigator.clipboard.writeText(siteConfig.links.discord);
    } catch {
      next = "failed";
    }

    setState(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  return (
    <>
      {/* Fixed min width so the label swap never shifts its neighbours. */}
      <button type="button" onClick={copyInvite} className="btn btn-glass w-full min-w-40 sm:w-auto">
        {state === "copied" ? (
          <>
            <CheckIcon className="text-keyframe-strong" />
            Copied
          </>
        ) : state === "failed" ? (
          "Copy failed"
        ) : (
          <>
            <CopyIcon />
            Copy invite
          </>
        )}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {ANNOUNCEMENT[state]}
      </span>
    </>
  );
}
