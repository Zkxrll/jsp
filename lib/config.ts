export type ServiceStatus = "operational" | "degraded" | "offline";

function readStatus(value: string | undefined): ServiceStatus {
  if (value === "degraded" || value === "offline") return value;
  return "operational";
}

export const siteConfig = {
  name: "Zkx Hub",

  tagline: "Silent aim, a real antihit, and a full menu for Rivals.",

  description:
    "Zkx Hub is a Rivals script with silent and camera aimbot, voidspam antihit, anti-aim, weapon mods, ESP, chams, bullet tracers, a full lighting suite, and background automation.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zkxhub.vercel.app",

  keySystemUrl:
    process.env.NEXT_PUBLIC_KEY_SYSTEM_URL ??
    "https://jnkie.com/get-key/zkxhub",

  links: {
    discord:
      process.env.NEXT_PUBLIC_DISCORD_URL ??
      "https://discord.com/invite/bxu2WMjNjN",

  docs:
    process.env.NEXT_PUBLIC_DOCS_URL ??
    "",
  },

  status: readStatus(process.env.NEXT_PUBLIC_SERVICE_STATUS),
} as const;
