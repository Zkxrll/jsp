"use client";

import { useEffect, useState, ViewTransition } from "react";
import Link from "next/link";

import { DiscordGlyph } from "./discord-glyph";
import { ArrowLeftIcon, ArrowUpRightIcon, CheckIcon, Spinner } from "./icons";
import { siteConfig } from "@/lib/config";
import { track } from "@/lib/analytics";

/**
 * Two honest steps: open the Discord, then continue to the key system.
 *
 * There is no fake "verification" here. This page cannot see whether
 * someone joined the server, so it doesn't claim to check. Step 1 completes
 * the moment the invite opens. If real membership gating is ever needed,
 * it has to be a real check (Discord OAuth + a guild lookup on the server),
 * not a timer.
 */
export function GetKeyFlow() {
  const [discordOpened, setDiscordOpened] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Coming back with the browser's back button can restore this page from
  // the back/forward cache with `leaving` still true. Reset it so the button
  // isn't stuck on a spinner.
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) setLeaving(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const openDiscord = () => {
    if (!discordOpened) track({ name: "get_key_discord_opened" });
    setDiscordOpened(true);
  };

  const continueToKey = () => {
    if (!discordOpened || leaving) return;
    setLeaving(true);
    track({ name: "get_key_redirected", props: { destination: siteConfig.keySystemUrl } });
    window.location.href = siteConfig.keySystemUrl;
  };

  return (
    // Pairs with the hero's Get Key button: arriving from it, this card grows
    // out of the button; "Back to home" shrinks it back in.
    <ViewTransition name="get-key" share={{ "key-morph": "key-morph", default: "none" }} default="none">
      <div className="card p-6 sm:p-10">
        <p className="label label-accent">Access</p>
        <h1 className="section-title mt-3">Get your key.</h1>
        <p className="lede mt-4">
          Open the Zkx Hub Discord, then continue to the key system. It issues your
          key; paste it into the script when it asks.
        </p>

        <ol className="mt-8 grid gap-3">
          <li>
            <a
              href={siteConfig.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openDiscord}
              data-done={discordOpened}
              className="step"
            >
              <span className="step-badge" data-done={discordOpened}>
                {discordOpened ? <CheckIcon /> : <DiscordGlyph />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-ink">
                  Open the Zkx Hub Discord
                </span>
                <span className="mt-1 block text-sm text-ink-muted">
                  {discordOpened ? "Opened in a new tab. Join, then come back here." : "Opens in a new tab"}
                </span>
              </span>
              <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-ink-muted" />
            </a>
          </li>

          <li>
            <button
              type="button"
              onClick={continueToKey}
              disabled={!discordOpened}
              aria-busy={leaving}
              className="btn btn-primary btn-lg w-full"
            >
              {leaving ? (
                <>
                  <Spinner />
                  Opening key system
                </>
              ) : discordOpened ? (
                "Continue to key system"
              ) : (
                "Open the Discord first"
              )}
            </button>
          </li>
        </ol>

        <div className="mt-8 border-t border-white/5 pt-6">
          <Link
            href="/"
            transitionTypes={["nav-back", "key-morph"]}
            className="text-link inline-flex items-center gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </ViewTransition>
  );
}
