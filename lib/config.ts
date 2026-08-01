export type ServiceStatus = "operational" | "degraded" | "offline";

function readStatus(value: string | undefined): ServiceStatus {
  if (value === "degraded" || value === "offline") return value;
  return "operational";
}

export const siteConfig = {
  name: "Zkx Hub",

  tagline: "The one Rivals script every exploiters need.",

  description:
    "Zkx Hub gives you access to one of the most advanced free Rivals script.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zkxhub.vercel.app",

  keySystemUrl:
    process.env.NEXT_PUBLIC_KEY_SYSTEM_URL ??
    "https://jnkie.com/get-key/zkxhub",

  links: {
    discord:
      process.env.NEXT_PUBLIC_DISCORD_URL ??
      "https://discord.com/invite/bxu2WMjNjN",
  },

  status: readStatus(process.env.NEXT_PUBLIC_SERVICE_STATUS),
} as const;
