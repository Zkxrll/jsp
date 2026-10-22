/**
 * The script library: one entry per supported game.
 *
 * Every surface that shows a game (the scripts page, the home page tiles,
 * the new-script announcement) reads its name, artwork, and anchor from
 * here, so they can never disagree. `id` is the stable anchor on the
 * scripts page: /scripts#<id>. Change it and every link follows.
 */

export interface Game {
  /** Stable anchor on the scripts page. */
  id: string;
  name: string;
  /** Served from public/. 16:9 artwork. */
  image: string;
  /** Describes the artwork, for screen readers. */
  imageAlt: string;
  /** One line for the home page tile. */
  summary: string;
  /** Full description on the scripts page. */
  description: string;
  /** The newest script. Marked "New" and announced on the home page. */
  isNew?: boolean;
}

/** Every entry currently loads from the same source. */
export const LOADSTRING =
  'loadstring(game:HttpGet("https://raw.githubusercontent.com/ZkxrI/ZkxHub/refs/heads/main/source"))()';

/** Intrinsic size of the artwork in public/games, so it reserves its space. */
export const GAME_IMAGE_SIZE = { width: 768, height: 432 } as const;

export const games = [
  {
    id: "rivals",
    name: "Rivals",
    image: "/games/rivals.webp",
    imageAlt: "Two red Rivals characters trading fire with golden SMGs across a white arena.",
    summary: "Aimbot modes, weapon mods, ESP, chams, and world visuals.",
    description:
      "Combat tools include configurable aimbot modes and triggerbot, weapon tweaks, player ESP, chams and tracers, custom crosshairs, hit feedback, world visuals, and gameplay automation.",
  },
  {
    id: "sniper-duels",
    name: "Sniper Duels",
    image: "/games/sniper-duels.webp",
    imageAlt: "A white marble-finish sniper rifle with a mounted scope, with the Sniper Duels logo.",
    summary: "ESP, aimbot with visibility checks, speed, and noclip.",
    description:
      "Includes player ESP with boxes, names, health and optional tracers, plus configurable aimbot, FOV and visibility checks, speed controls, and noclip.",
  },
  {
    id: "steal-an-egg",
    name: "Steal An Egg",
    image: "/games/steal-an-egg.webp",
    imageAlt: "A Roblox player sneaking past a sleeping shadow dragon, carrying a glowing cosmic egg.",
    summary: "Steal, hatch, and sell automation, predictors, and ESP.",
    description:
      "Automation for stealing, placing, hatching, and selling eggs or pets, plus mutations, fusing, event helpers, player options, ESP, egg predictors, and server hopping.",
    isNew: true,
  },
] as const satisfies readonly Game[];

export type LibraryGame = (typeof games)[number];
export type GameId = LibraryGame["id"];

export function gameById(id: GameId): LibraryGame {
  const game = games.find((g) => g.id === id);
  if (!game) throw new Error(`Unknown game id: ${id}`);
  return game;
}

export function scriptsHref(id: GameId) {
  return `/scripts#${id}`;
}
