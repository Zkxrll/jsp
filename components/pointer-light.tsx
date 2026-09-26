"use client";

import { useEffect } from "react";

/**
 * Feeds the pointer position to [data-spotlight] surfaces as --mx / --my,
 * so their light follows the cursor. One delegated listener for the whole
 * page, batched to one write per frame. Mouse only: on touch there is no
 * hover, so there is nothing to follow.
 */
export function PointerLight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let target: HTMLElement | null = null;
    let x = 0;
    let y = 0;

    const onMove = (event: PointerEvent) => {
      target = (event.target as Element | null)?.closest<HTMLElement>("[data-spotlight]") ?? null;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const apply = () => {
      frame = 0;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${x - rect.left}px`);
      target.style.setProperty("--my", `${y - rect.top}px`);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
