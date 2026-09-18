"use client";

import { useEffect } from "react";

/**
 * Reveals [data-reveal] elements as they scroll into view.
 *
 * Renders nothing. On mount it flags the document with `reveal-on` so the
 * hide-then-reveal styling only applies when JS runs, which means content is
 * always visible without JS and never gets stuck hidden. Honors
 * prefers-reduced-motion by leaving everything visible and skipping the
 * observer entirely.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (elements.length === 0) return;

    root.classList.add("reveal-on");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

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
