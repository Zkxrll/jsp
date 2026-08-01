/**
 * Minimal analytics abstraction.
 *
 * No third-party SDK is called here today — `track()` just logs in
 * development, so every call site in the app already exists and is
 * typed. Wire in a real provider (Vercel Analytics, Plausible, PostHog,
 * GA4 — whatever fits) by filling in the body of `track()`; nothing
 * that calls `track()` elsewhere needs to change.
 *
 * The event union is exhaustive on purpose: adding a new event means
 * adding a variant here, which makes every call site a compile error
 * until it's updated — cheaper to catch than a silently-misspelled
 * event name shipped to production analytics.
 */

type AnalyticsEvent =
  | { name: "get_key_clicked"; props?: { source?: string } }
  | { name: "get_key_redirected"; props: { destination: string } }
  | { name: "get_key_blocked_no_url" };

export function track(event: AnalyticsEvent): void {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event.name, "props" in event ? event.props : undefined);
    return;
  }

  // Example wiring for Vercel Analytics, once `@vercel/analytics` is installed:
  //   import { track as vercelTrack } from "@vercel/analytics";
  //   vercelTrack(event.name, "props" in event ? event.props : undefined);
}
