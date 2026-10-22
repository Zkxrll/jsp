import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scripts",
  description: "Browse the available Zkx Hub scripts for Rivals, Sniper Duels, and Steal An Egg.",
};

export default function ScriptsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
