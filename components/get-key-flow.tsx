"use client";

import { useEffect, useState, ViewTransition } from "react";
import Link from "next/link";

import { ArrowLeftIcon, Spinner } from "./icons";
import { siteConfig } from "@/lib/config";
import { track } from "@/lib/analytics";

/** Direct key-system flow. Discord is optional, not a prerequisite. */
export function GetKeyFlow() {
  const [leaving, setLeaving] = useState(false);

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
    <ViewTransition name="get-key" share={{ "key-morph": "key-morph", default: "none" }} default="none">
      <div className="card p-6 sm:p-10">
        <p className="label label-accent">Access</p>
        <h1 className="section-title mt-3">Get your key.</h1>
        <p className="lede mt-4">
          Continue directly to the key system to get your key. Paste it into the
          script when it asks. Joining the Discord is optional.
        </p>

        <div className="mt-8">
          <button
            type="button"
            onClick={continueToKey}
            disabled={leaving}
            aria-busy={leaving}
            className="btn btn-primary btn-lg w-full"
          >
            {leaving ? (
              <>
                <Spinner />
                Opening key system
              </>
            ) : (
              "Continue to key system"
            )}
          </button>
        </div>

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
