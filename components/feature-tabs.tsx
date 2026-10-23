"use client";

import { useRef, useState, type ReactNode } from "react";

export interface FeatureTab {
  id: string;
  label: string;
  isNew?: boolean;
  /** Rendered on the server; every panel is in the HTML, inactive ones hidden. */
  panel: ReactNode;
}

/** One tab per game. Arrow keys, Home, and End move between tabs. */
export function FeatureTabs({ tabs }: { tabs: readonly FeatureTab[] }) {
  const [index, setIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (next: number) => {
    const clamped = (next + tabs.length) % tabs.length;
    setIndex(clamped);
    tabRefs.current[clamped]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (event.key in step) {
      event.preventDefault();
      select(index + (step[event.key] ?? 0));
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      select(event.key === "Home" ? 0 : tabs.length - 1);
    }
  };

  return (
    <div>
      <div role="tablist" aria-label="Games" className="tabs" onKeyDown={onKeyDown}>
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`features-tab-${tab.id}`}
            aria-selected={i === index}
            aria-controls={`features-panel-${tab.id}`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => setIndex(i)}
            className="tab"
          >
            {tab.label}
            {tab.isNew && <span className="tag">New</span>}
          </button>
        ))}
      </div>

      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          id={`features-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`features-tab-${tab.id}`}
          hidden={i !== index}
          className="tab-panel mt-6"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
