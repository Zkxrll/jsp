"use client";

import { useEffect } from "react";

/**
 * Reveals [data-reveal] elements as they scroll into view.
 *
 * Renders nothing. The inline bootstrap script in app/layout.tsx decides,
 * before first paint, whether reveal is on (`reveal-on` on <html>): only when
 * JS runs and motion is allowed. This component just observes, and marks the
 * page as hydrated so the bootstrap's safety timeout doesn't fire.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.revealReady = "1";
    if (!root.classList.contains("reveal-on")) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
