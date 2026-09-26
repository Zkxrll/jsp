"use client";

import { useRef, useState } from "react";
import { features } from "@/lib/features";

/** Toggles shown per feature. Keeps every panel the same height. */
const MAX_TOGGLES = 5;

function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className="switch"
    >
      <span className="switch-thumb" />
    </button>
  );
}

/**
 * An interactive stand-in for the in-game menu: every tab, label, and toggle
 * name comes from lib/features.ts, so it can't show something the script
 * doesn't have. Tabs switch, the lens slides on a spring, and the switches
 * work (locally; nothing is sent anywhere).
 */
export function MenuPreview() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      features.flatMap((f) => f.tags.slice(0, MAX_TOGGLES).map((tag, i) => [`${f.title}:${tag}`, i < 2])),
    ),
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (next: number, focus = false) => {
    const clamped = (next + features.length) % features.length;
    setDirection(clamped >= index ? "down" : "up");
    setIndex(clamped);
    if (focus) tabRefs.current[clamped]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (event.key in keys) {
      event.preventDefault();
      select(index + (keys[event.key] ?? 0), true);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      select(event.key === "Home" ? 0 : features.length - 1, true);
    }
  };

  const feature = features[index] ?? features[0]!;

  return (
    <figure className="m-0">
      <div className="menu-window glass">
        <div className="menu-titlebar">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-ink">Zkx Hub</span>
            <span className="text-sm text-ink-muted">Rivals</span>
          </div>
          <span className="chip">Preview</span>
        </div>

        <div className="grid md:grid-cols-[14rem_1fr]">
          {/* Tabs: a vertical rail on desktop, a scrolling strip on phones. */}
          <div
            role="tablist"
            aria-label="Menu sections"
            onKeyDown={onKeyDown}
            className="relative flex gap-1 overflow-x-auto border-b border-white/5 p-3 [scrollbar-width:none] md:flex-col md:gap-0 md:overflow-visible md:border-b-0 md:border-r"
          >
            <span
              className="menu-tab-indicator hidden md:block"
              aria-hidden="true"
              style={{ transform: `translate(0.75rem, calc(0.75rem + ${index} * 2.5rem))`, width: "calc(100% - 1.5rem)" }}
            />
            {features.map((f, i) => (
              <button
                key={f.title}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`menu-tab-${i}`}
                aria-selected={i === index}
                aria-controls="menu-panel"
                tabIndex={i === index ? 0 : -1}
                onClick={() => select(i)}
                className="menu-tab max-md:aria-selected:bg-white/8"
              >
                {f.title}
              </button>
            ))}
          </div>

          <div
            id="menu-panel"
            role="tabpanel"
            aria-labelledby={`menu-tab-${index}`}
            className="min-h-96 p-6 sm:p-8"
          >
            <div key={index} data-dir={direction} className="menu-panel">
              <p className="label label-accent">{feature.tab}</p>
              <h3 className="title-sm mt-2">{feature.title}</h3>
              <p className="body-sm mt-2 line-clamp-2">{feature.blurb}</p>

              <div className="mt-4">
                {feature.tags.slice(0, MAX_TOGGLES).map((tag) => {
                  const key = `${feature.title}:${tag}`;
                  return (
                    <div key={key} className="menu-row">
                      <span>{tag}</span>
                      <Switch
                        label={tag}
                        checked={toggles[key] ?? false}
                        onChange={() => setToggles((t) => ({ ...t, [key]: !t[key] }))}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm text-ink-muted">
        Interactive preview. The tabs and toggles match the in-game menu.
      </figcaption>
    </figure>
  );
}
