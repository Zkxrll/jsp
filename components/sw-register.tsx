"use client";

import { useEffect } from "react";

/**
 * Registers the Monetag service worker (public/sw.js, zone 11624875).
 * This zone earns nothing until the SW is actually registered — the
 * file existing in public/ isn't enough, the browser has to be told
 * to install it. Runs once on mount, client-side only.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => console.error("SW registration failed:", err));
  }, []);

  return null;
}
