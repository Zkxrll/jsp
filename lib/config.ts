/**
 * Central site configuration.
 *
 * This is the one file to edit when rebranding the page, changing the
 * key-system destination, or wiring in support links. Nothing else in
 * the app reads `process.env` directly — every environment-variable
 * name is defined here exactly once.
 */

export type ServiceStatus = "operational" | "degraded" | "offline";

function readStatus(value: string | undefined): ServiceStatus {
  if (value === "degraded" || value === "offline") return value;
  return "operational";
}

export const siteConfig = {
  /** Shown in the header, hero, footer, and <title>. */
  name: "Zkx Hub",

  /** One line. Used in the hero subheading and as a metadata fallback. */
  tagline: "The one Rivals script every exploiters need.",

  /** Longer form — used for the SEO meta description and OpenGraph. */
  description:
    "Zkx Hub gives you access to one of the most advanced free Rivals script.",

  /** Canonical production URL. Update once a custom domain is attached. */
  url: process.env.zkxhub.vercel.app ?? "https://rframe-animator.vercel.app",

  /**
   * Destination for the "Get Key" button. Required in production — the
   * button renders a disabled, explanatory state if this is empty
   * instead of navigating to an invalid URL. Change the value here (or
   * in Vercel's environment variables) any time; no other file needs
   * to change.
   */
  keySystemUrl: process.env.jnkie.com/get-key/zkxhub ?? "",

  /** Optional support / community links. Empty string hides the link. */
  links: {
    discord: process.env.discord.com/invite/bxu2WMjNjN ?? "",
  },

  /** Drives the header status pill and the /status page. */
  status: readStatus(process.env.NEXT_PUBLIC_SERVICE_STATUS),
} as const;
