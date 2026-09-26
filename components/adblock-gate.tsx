"use client";

import { useEffect, useRef, useState } from "react";
import { DetectAdblock } from "@scthakuri/adblock-detector";
import { AlertIcon } from "./icons";

export function AdBlockGate() {
  const [blocked, setBlocked] = useState(false);
  const reloadRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let mounted = true;

    DetectAdblock((detected: boolean) => {
      if (mounted) setBlocked(detected);
    });

    return () => {
      mounted = false;
    };
  }, []);

  // While the notice is up: lock page scroll and keep focus on the dialog's
  // only action, so keyboard users can't tab into the page behind it.
  useEffect(() => {
    if (!blocked) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    reloadRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [blocked]);

  if (!blocked) return null;

  return (
    <div
      className="modal-scrim"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="adblock-title"
      aria-describedby="adblock-body"
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          event.preventDefault();
          reloadRef.current?.focus();
        }
      }}
    >
      <div className="glass modal-card p-8 text-center">
        <span className="icon-tile mx-auto text-danger">
          <AlertIcon />
        </span>

        <h2 id="adblock-title" className="section-title mt-6">
          Ad blocker detected
        </h2>

        <p id="adblock-body" className="body-sm mt-4">
          Ads keep Zkx Hub and the free key system running. Allow ads for this
          site in your blocker, then reload the page.
        </p>

        <button
          ref={reloadRef}
          type="button"
          onClick={() => window.location.reload()}
          className="btn btn-primary btn-lg mt-8 w-full"
        >
          Reload page
        </button>
      </div>
    </div>
  );
}
