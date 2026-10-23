export type ServiceStatus = "operational" | "degraded" | "offline";

function readStatus(value: string | undefined): ServiceStatus {
  if (value === "degraded" || value === "offline") return value;
  return "operational";
}

export const siteConfig = {
  name: "Zkx Hub",

  tagline: "Roblox scripts for Rivals, Sniper Duels, and Steal An Egg, from one loader.",

  description:
    "Zkx Hub is a Roblox script hub with scripts for Rivals, Sniper Duels, and Steal An Egg: aimbot, ESP, and automation, all from one loader and one key system.",

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
