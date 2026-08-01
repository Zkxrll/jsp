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
  name: "rFrame Animator",

  /** One line. Used in the hero subheading and as a metadata fallback. */
  tagline: "The animation editor Roblox Studio should have shipped with.",

  /** Longer form — used for the SEO meta description and OpenGraph. */
  description:
    "rFrame Animator brings a curve-based keyframe editor and bone-accurate IK to Roblox Studio. Install free from the Creator Store, then grab a key to unlock the full toolset.",

  /** Canonical production URL. Update once a custom domain is attached. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rframe-animator.vercel.app",

  /**
   * Destination for the "Get Key" button. Required in production — the
   * button renders a disabled, explanatory state if this is empty
   * instead of navigating to an invalid URL. Change the value here (or
   * in Vercel's environment variables) any time; no other file needs
   * to change.
   */
  keySystemUrl: process.env.NEXT_PUBLIC_KEY_SYSTEM_URL ?? "",

  /** Optional support / community links. Empty string hides the link. */
  links: {
    discord: process.env.NEXT_PUBLIC_DISCORD_URL ?? "",
    docs: process.env.NEXT_PUBLIC_DOCS_URL ?? "",
  },

  /** Drives the header status pill and the /status page. */
  status: readStatus(process.env.NEXT_PUBLIC_SERVICE_STATUS),
} as const;
