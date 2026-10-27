import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Get Key",
  description: `Get a free ${siteConfig.name} key from the key system.`,
};

export default function GetKeyPage() {
  redirect(siteConfig.keySystemUrl);
}
