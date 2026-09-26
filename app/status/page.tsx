import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig, type ServiceStatus } from "@/lib/config";

export const metadata: Metadata = {
  title: "Status",
  description: `Current status of ${siteConfig.name} and its key system.`,
};

interface StatusCheck {
  name: string;
  status: ServiceStatus;
  note: string;
}

/**
 * Static for now. Swap this array for a fetch against a real
 * monitoring endpoint (Better Stack, status.io, your own health-check
 * route) once one exists. The shape below matches what most of those
 * return, so the swap is a data-source change, not a UI rewrite.
 */
const checks: StatusCheck[] = [
  { name: "Website", status: "operational", note: "This site and the Get Key page." },
  {
    name: "Key system",
    status: siteConfig.status,
    note: "Issues keys. Run by a third party; outages there show up here.",
  },
];

// Three states, three distinct colors: green, amber, red.
const STATUS_STYLES: Record<ServiceStatus, string> = {
  operational: "text-online",
  degraded: "text-warning",
  offline: "text-danger",
};

const STATUS_LABEL: Record<ServiceStatus, string> = {
  operational: "Operational",
  degraded: "Degraded",
  offline: "Offline",
};

export default function StatusPage() {
  return (
    <div className="site-shell">
      <div className="grid-overlay" aria-hidden="true" />

      <SiteHeader />

      <main className="wrap wrap-narrow relative z-10 flex-1 py-16">
        <p className="label label-accent">Status</p>
        <h1 className="section-title mt-3">System status.</h1>
        <p className="lede mt-4">Every service the site and key flow depend on.</p>

        <ul className="card mt-8 divide-y divide-surface-border">
          {checks.map((check) => (
            <li key={check.name} className="flex items-center justify-between gap-4 px-6 py-5">
              <div>
                <p className="card-title">{check.name}</p>
                <p className="body-sm mt-1">{check.note}</p>
              </div>
              <span
                className={`inline-flex shrink-0 items-center gap-2 text-sm font-semibold ${STATUS_STYLES[check.status]}`}
              >
                <span className="status-dot" aria-hidden="true" />
                {STATUS_LABEL[check.status]}
              </span>
            </li>
          ))}
        </ul>
      </main>

      <SiteFooter />
    </div>
  );
}
