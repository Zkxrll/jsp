"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";

export function CopyDiscordButton() {
  const [copied, setCopied] = useState(false);

  async function copyInvite() {
    try {
      await navigator.clipboard.writeText(siteConfig.links.discord);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyInvite}
      className="copy-button"
      aria-label="Copy Discord invite"
    >
      {copied ? (
        <span className="copy-success">
          Copied ✓
        </span>
      ) : (
        <span className="copy-default">
          Copy Invite
        </span>
      )}
    </button>
  );
}
