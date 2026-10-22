import { RouteTransition } from "@/components/route-transition";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeader } from "@/components/section-header";
import { GameMedia } from "@/components/game-media";
import { CopyLoaderButton } from "@/components/copy-loader-button";
import { HashTarget } from "@/components/hash-target";
import { games, LOADSTRING } from "@/lib/games";

const GAME_IDS = games.map((game) => game.id);

export default function ScriptsPage() {
  return (
    <RouteTransition>
      <main className="flex-1">
        <section className="wrap pb-16 pt-28 sm:pb-24 sm:pt-36">
          <SectionHeader
            as="h1"
            label="Script library"
            title={
              <>
                Pick a game.
                <br />
                Copy the script.
              </>
            }
          >
            A quick overview of each game, followed by the loader you can copy
            straight from the page. Every entry currently uses the same source.
          </SectionHeader>

          <div className="mt-12 grid gap-6 sm:mt-16">
            {games.map((game, index) => (
              <article
                key={game.id}
                id={game.id}
                aria-labelledby={`${game.id}-title`}
                className="game-card card"
                data-reveal
              >
                <GameMedia
                  game={game}
                  showNewTag
                  priority={index === 0}
                  className="cut rounded-[var(--radius)]"
                  sizes="(min-width: 1152px) 560px, (min-width: 900px) 50vw, 100vw"
                />

                <div className="min-w-0 px-1 pb-1 sm:px-2 lg:pr-4">
                  <h2 id={`${game.id}-title`} className="section-title">
                    {game.name}
                  </h2>
                  <p className="body-sm mt-3 max-w-lg">{game.description}</p>

                  <div className="loader-field mt-6">
                    <div className="loader-field-head">
                      <p className="label">
                        Loadstring<span className="hidden sm:inline"> · shared source</span>
                      </p>
                      <CopyLoaderButton game={game.name} />
                    </div>
                    <code>{LOADSTRING}</code>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <HashTarget ids={GAME_IDS} />
      <SiteFooter />
    </RouteTransition>
  );
}
