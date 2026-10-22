import Image from "next/image";
import { GAME_IMAGE_SIZE, type Game } from "@/lib/games";

type GameMediaProps = {
  game: Game;
  /** Responsive `sizes` hint, so the browser picks a fitting width. */
  sizes: string;
  /** Above the fold: load immediately instead of lazily. */
  priority?: boolean;
  /** Show the "New" tag on the newest script. */
  showNewTag?: boolean;
  /** Decorative when the game's name sits right next to it. */
  decorative?: boolean;
  className?: string;
};

/**
 * A game's artwork in its 16:9 frame. The one way any surface shows game
 * art, so the scripts page, the home tiles, and the announcement all use
 * the same asset with the same treatment.
 */
export function GameMedia({
  game,
  sizes,
  priority = false,
  showNewTag = false,
  decorative = false,
  className = "",
}: GameMediaProps) {
  return (
    <div className={`game-media ${className}`}>
      {showNewTag && game.isNew && <span className="tag">New</span>}
      <Image
        src={game.image}
        alt={decorative ? "" : game.imageAlt}
        width={GAME_IMAGE_SIZE.width}
        height={GAME_IMAGE_SIZE.height}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
