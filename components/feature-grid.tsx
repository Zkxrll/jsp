import type { ReactNode } from "react";
import { featuresByGame, type FeatureIcon } from "@/lib/features";
import type { GameId } from "@/lib/games";

/**
 * One game's features. Pure presentation: it renders whatever
 * lib/features.ts holds for that game, so the copy can never describe a
 * feature the script does not ship. Server component, no JS shipped.
 *
 * Layout: one surface split by hairlines, with a column count per game
 * chosen so no cell is ever left empty. Rivals: the two `featured`
 * entries take a half-width cell each across the top row, and the rest
 * fill two four-up rows.
 */

/** Columns per game; each divides that game's feature count evenly. */
const GRID_COLUMNS: Record<GameId, string> = {
  rivals: "sm:grid-cols-2 lg:grid-cols-4",
  "sniper-duels": "md:grid-cols-3",
  "steal-an-egg": "sm:grid-cols-2 lg:grid-cols-3",
};

const ICONS: Record<FeatureIcon, ReactNode> = {
  egg: (
    <>
      <path d="M12 3c-3.6 0-6.5 5.4-6.5 10a6.5 6.5 0 0 0 13 0C18.5 8.4 15.6 3 12 3Z" />
      <path d="m8 13.5 2 -1.5 2 1.5 2 -1.5 2 1.5" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8.5 13.2 10.8 15.5 12 13.2 13.2 12 15.5 10.8 13.2 8.5 12 10.8 10.8Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  shuffle: (
    <>
      <path d="M3 7h3.5c4.5 0 6.5 10 11 10H21M3 17h3.5c1.6 0 2.8-1.2 3.8-2.8M13.7 9.8C14.7 8.2 15.9 7 17.5 7H21" />
      <path d="m18.5 4.5 2.5 2.5-2.5 2.5M18.5 14.5l2.5 2.5-2.5 2.5" />
    </>
  ),
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
      <circle cx="9" cy="6" r="1.9" fill="var(--color-surface)" />
      <circle cx="15" cy="12" r="1.9" fill="var(--color-surface)" />
      <circle cx="8" cy="18" r="1.9" fill="var(--color-surface)" />
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
    <svg
      viewBox="0 0 24 24"
      className="icon-mark"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[icon]}
    </svg>
  );
}

export function FeatureGrid({ gameId }: { gameId: GameId }) {
  return (
    <div className={`panel-grid ${GRID_COLUMNS[gameId]}`}>
      {featuresByGame[gameId].map((feature) => (
        <article
          key={feature.title}
          className={`flex flex-col p-6 ${feature.featured ? "sm:col-span-2 lg:p-8" : ""}`}
        >
          <div className="flex items-center gap-3">
            <FeatureIconMark icon={feature.icon} />
            {feature.tab && <span className="label">{feature.tab}</span>}
          </div>

          <h3 className={feature.featured ? "title-md mt-5" : "title-sm mt-5"}>{feature.title}</h3>

          <p className="body-sm mt-2 flex-1">{feature.blurb}</p>

          {feature.tags && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${feature.title} options`}>
              {feature.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}
