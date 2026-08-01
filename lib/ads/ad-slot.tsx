"use client";

import { useEffect, useRef } from "react";
import type { AdProvider, AdSlotProps } from "./types";

/**
 * Registered providers, keyed by the slot they're allowed to render in.
 * Empty by default — the site ships with zero third-party script tags
 * until a provider is added here. See ./README.md before adding one.
 */
const providers: Partial<Record<AdSlotProps["slot"], AdProvider>> = {
  // footer: { id: "example-network", scriptSrc: "https://provider.example/tag.js" },
};

/**
 * Renders nothing until a provider is registered for `slot`. When one
 * is, it injects that provider's script exactly once per mount and
 * leaves a container div for the script to mount into. This is the
 * only file in the app that ever touches third-party ad markup —
 * pages and components never import a network's SDK directly.
 */
export function AdSlot({ slot, className }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const provider = providers[slot];

  useEffect(() => {
    if (!provider?.scriptSrc) return;

    const script = document.createElement("script");
    script.src = provider.scriptSrc;
    script.async = true;
    script.dataset.adSlot = slot;
    if (provider.onLoad) script.onload = provider.onLoad;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [provider, slot]);

  if (!provider) return null;

  return <div ref={containerRef} className={className} data-ad-slot={slot} aria-hidden="true" />;
}
