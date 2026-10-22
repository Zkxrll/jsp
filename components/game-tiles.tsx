import Link from "next/link";
import { GameMedia } from "./game-media";
import { ArrowRightIcon } from "./icons";
import { games, scriptsHref } from "@/lib/games";

/** Home page entry points into the script library, one per game. */
export function GameTiles() {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {games.map((game) => (
        <li key={game.id} data-reveal>
          <Link href={scriptsHref(game.id)} transitionTypes={["nav-forward"]} className="game-tile">
            <GameMedia
              game={game}
              decorative
              showNewTag
              className="cut"
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            />
            <span className="mt-4 flex items-center justify-between gap-4">
              <span className="game-tile-name title-md">{game.name}</span>
              <ArrowRightIcon className="game-tile-arrow h-5 w-5 shrink-0 text-ink-muted" />
            </span>
            <span className="body-sm mt-1">{game.summary}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
