import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { GetKeyFlow } from "@/components/get-key-flow";
import { RouteTransition } from "@/components/route-transition";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Get Key",
  description: `Get a free ${siteConfig.name} key: open the Discord, then continue to the key system.`,
};

export default function GetKeyPage() {
  return (
    <RouteTransition>
      <main className="wrap flex flex-1 items-center justify-center pb-16 pt-32">
        <section className="w-full max-w-xl">
          <GetKeyFlow />
        </section>
      </main>

      <SiteFooter />
    </RouteTransition>
  );
}
