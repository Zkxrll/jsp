"use client";

import { useEffect, useState } from "react";

/** Marker positions along the strip, as percentages. Purely decorative. */
const MARKERS = [6, 18, 34, 47, 61, 78, 92];
const FPS = 30;
const LOOP_FRAMES = FPS * 12; // 12-second loop

function formatTimecode(frame: number): string {
  const totalSeconds = Math.floor(frame / FPS);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const frames = frame % FPS;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `00:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

/**
 * Decorative timeline scrubber — the page's one signature visual,
 * built from the product's own vernacular (a keyframe track and a
 * timecode readout) instead of a generic hero graphic. The playhead
 * position is driven by a local interval only; nothing here reads
 * real animation data, and it stops entirely under reduced motion.
 */
export function TimelineStrip() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % LOOP_FRAMES);
    }, 1000 / FPS);

    return () => window.clearInterval(id);
  }, []);

  const playheadPct = (frame / LOOP_FRAMES) * 100;

  return (
    <div className="w-full max-w-xl select-none" aria-hidden="true">
      <div className="relative h-8">
        <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-surface-border" />

        {MARKERS.map((pct) => (
          <div
            key={pct}
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-keyframe"
            style={{ left: `${pct}%` }}
          />
        ))}

        <div
          className="absolute top-0 bottom-0 w-px bg-curve"
          style={{ left: `${playheadPct}%` }}
        >
          <div className="absolute -top-1 -left-[3px] h-2 w-2 rounded-full bg-curve" />
        </div>
      </div>

      <p className="mt-2 font-mono text-xs tracking-wider text-ink-muted">
        {formatTimecode(frame)}
      </p>
    </div>
  );
}
