import Link from "next/link";
import { GameMedia } from "./game-media";
import { ArrowRightIcon } from "./icons";
import { games, scriptsHref } from "@/lib/games";

/**
 * The hero's product shot: the script library as a window, one row per
 * game. Every row is a real link to that game's entry on the scripts page.
 */
export function LibraryPanel() {
  return (
    <nav aria-label="Script library" className="window">
      <div className="window-bar">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-sm font-extrabold uppercase tracking-wide text-ink">Zkx Hub</span>
          <span className="text-sm text-ink-muted">Script library</span>
        </div>
        <span className="chip">{games.length} games</span>
      </div>

      <ul>
        {games.map((game, index) => (
          <li key={game.id}>
            <Link href={scriptsHref(game.id)} transitionTypes={["nav-forward"]} className="library-row">
              <GameMedia
                game={game}
                decorative
                priority={index === 0}
                className="library-thumb cut"
                sizes="(min-width: 640px) 160px, 112px"
              />
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="library-row-name title-md whitespace-nowrap">{game.name}</span>
                  {game.isNew && <span className="tag">New</span>}
                </span>
                <span className="body-sm mt-1 block">{game.summary}</span>
              </span>
              <ArrowRightIcon className="library-row-arrow h-5 w-5 shrink-0 text-ink-muted" />
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/scripts" transitionTypes={["nav-forward"]} className="library-footer">
        Open the script library
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </nav>
  );
}
