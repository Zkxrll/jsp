"use client";

import { useEffect } from "react";

/** How long the arrived-at card keeps its accent edge before fading back. */
const HIGHLIGHT_MS = 1600;

/**
 * When the page is opened at /page#id (from the announcement, a game tile,
 * or a shared link), marks that element with data-targeted so it can show
 * the visitor where they landed, and makes sure it is in view.
 *
 * CSS :target can't do this: client-side navigation sets the hash with
 * history.pushState, which never updates :target.
 */
export function HashTarget({ ids }: { ids: readonly string[] }) {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let current: HTMLElement | null = null;

    const apply = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!ids.includes(id)) return;
      const el = document.getElementById(id);
      if (!el) return;

      const top = el.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.5) el.scrollIntoView({ block: "start" });

      if (current) current.removeAttribute("data-targeted");
      current = el;
      el.setAttribute("data-targeted", "true");
      clearTimeout(timer);
      timer = setTimeout(() => el.removeAttribute("data-targeted"), HIGHLIGHT_MS);
    };

    // After the route transition and Next's own hash scroll have settled.
    const frame = requestAnimationFrame(apply);
    window.addEventListener("hashchange", apply);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", apply);
      clearTimeout(timer);
      current?.removeAttribute("data-targeted");
    };
  }, [ids]);

  return null;
}
