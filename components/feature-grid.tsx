import type { ReactNode } from "react";
import { features, type FeatureIcon } from "@/lib/features";

/**
 * Feature showcase for the landing page. Pure presentation: it renders
 * whatever lib/features.ts contains, so the marketing copy can never
 * describe a feature the script does not ship. Server component, no JS
 * shipped to the client.
 *
 * Layout: on large screens the two `featured` entries take a half-width
 * cell each across the top row, and the rest fall into a four-up grid.
 */

const ICONS: Record<FeatureIcon, ReactNode> = {
  crosshair: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.4 2.9 8.2 7 9.5 4.1-1.3 7-5.1 7-9.5V6l-7-3Z" />
      <path d="m9.3 12 1.9 1.9 3.6-3.7" />
    </>
  ),
  sliders: (
    <>
      <path d="M5 6h14M5 12h14M5 18h14" />
      <circle cx="9" cy="6" r="1.9" fill="var(--tile-bg)" />
      <circle cx="15" cy="12" r="1.9" fill="var(--tile-bg)" />
      <circle cx="8" cy="18" r="1.9" fill="var(--tile-bg)" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  ghost: (
    <>
      <path d="M5 20V11a7 7 0 0 1 14 0v9l-2.3-1.6L14.4 20 12 18.4 9.6 20l-2.3-1.6L5 20Z" />
      <path d="M9.5 10h.01M14.5 10h.01" />
    </>
  ),
  pulse: (
    <>
      <path d="M2.5 12h4l2-6 4 13 2.5-8 1.6 3h4.4" />
    </>
  ),
  reticle: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 6.5v3M12 14.5v3M6.5 12h3M14.5 12h3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.5 4 5.7 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.7-4-9s1.4-6.5 4-9Z" />
    </>
  ),
  bolt: (
    <>
      <path d="M13 2 4.5 13.5H11l-1 8.5 9.5-12H13l0-8Z" />
    </>
  ),
  move: (
    <>
      <path d="M12 2v20M2 12h20" />
      <path d="m8.5 5.5 3.5-3 3.5 3M8.5 18.5l3.5 3 3.5-3M5.5 8.5l-3 3.5 3 3.5M18.5 8.5l3 3.5-3 3.5" />
    </>
  ),
};

function FeatureIconMark({ icon }: { icon: FeatureIcon }) {
  return (
    <span className="icon-tile" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ICONS[icon]}
      </svg>
    </span>
  );
}

export function FeatureGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <article
          key={feature.title}
          data-reveal
          data-spotlight
          className={`card flex flex-col p-6 ${feature.featured ? "sm:col-span-2 lg:p-8" : ""}`}
        >
          <div className="flex items-center justify-between gap-4">
            <FeatureIconMark icon={feature.icon} />
            <span className="label">{feature.tab}</span>
          </div>

          <h3 className="title-sm mt-4">{feature.title}</h3>

          <p className="body-sm mt-2 flex-1">{feature.blurb}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {feature.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
