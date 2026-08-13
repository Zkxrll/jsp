"use client";

import { useEffect } from "react";

export function CursorGlow() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const root = document.documentElement;

    let frame = 0;
    let x = -1000;
    let y = -1000;

    const update = () => {
      root.style.setProperty("--cursor-x", `${x}px`);
      root.style.setProperty("--cursor-y", `${y}px`);
      frame = 0;
    };

    const handleMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;

      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    window.addEventListener("pointermove", handleMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handleMove);

      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return <div className="cursor-glow" aria-hidden="true" />;
}
