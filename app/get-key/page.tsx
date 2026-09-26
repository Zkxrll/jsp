import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GetKeyFlow } from "@/components/get-key-flow";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Get Key",
  description: `Get a free ${siteConfig.name} key: open the Discord, then continue to the key system.`,
};

export default function GetKeyPage() {
  return (
    <div className="site-shell">
      <div className="grid-overlay" aria-hidden="true" />

      <SiteHeader showGetKey={false} />

      <main className="wrap relative z-10 flex flex-1 items-center justify-center py-16">
        <section className="w-full max-w-xl">
          <GetKeyFlow />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
