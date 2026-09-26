import { ViewTransition } from "react";

/**
 * Wraps a page's content so route changes animate by direction. Links opt
 * in with `transitionTypes={["nav-forward"]}` or `["nav-back"]`; the CSS for
 * each lives at the bottom of app/globals.css. The header sits outside this
 * wrapper (in the root layout), so it stays put while pages change beneath it.
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </ViewTransition>
  );
}
