"use client";

import { useEffect, useState, ViewTransition } from "react";
import Link from "next/link";

import { ArrowLeftIcon, Spinner } from "./icons";
import { siteConfig } from "@/lib/config";
import { track } from "@/lib/analytics";

/** One step: the Get Key button sends people to the key system. */
export function GetKeyFlow() {
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

  const continueToKey = () => {
    if (leaving) return;
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
          Click Get Key to continue to the key system. It issues your key; paste
          it into the script when it asks.
        </p>

        <button
          type="button"
          onClick={continueToKey}
          aria-busy={leaving}
          className="btn btn-primary btn-lg mt-8 w-full"
        >
          {leaving ? (
            <>
              <Spinner />
              Opening key system
            </>
          ) : (
            "Get Key"
          )}
        </button>

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
