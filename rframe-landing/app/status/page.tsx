import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig, type ServiceStatus } from "@/lib/config";

export const metadata: Metadata = {
  title: "Status",
  description: `Live status for ${siteConfig.name} and its key system.`,
};

interface StatusCheck {
  name: string;
  status: ServiceStatus;
  note: string;
}

/**
 * Static for now — swap this array for a fetch against a real
 * monitoring endpoint (Better Stack, status.io, your own health-check
 * route) once one exists. The shape below matches what most of those
 * return, so the swap is a data-source change, not a UI rewrite.
 */
const checks: StatusCheck[] = [
  { name: "Landing page", status: "operational", note: "Served from Vercel's edge network." },
  {
    name: "Key system",
    status: siteConfig.status,
    note: "Third-party — see their own status page for incident history.",
  },
];

const STATUS_STYLES: Record<ServiceStatus, string> = {
  operational: "text-online",
  degraded: "text-keyframe",
  offline: "text-danger",
};

const STATUS_LABEL: Record<ServiceStatus, string> = {
  operational: "Operational",
  degraded: "Degraded",
  offline: "Offline",
};

export default function StatusPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
        <h1 className="font-display text-3xl font-semibold text-ink">System status</h1>
        <p className="mt-2 text-ink-muted">Current status of every service this page depends on.</p>

        <ul className="mt-10 divide-y divide-surface-border rounded-xl border border-surface-border">
          {checks.map((check) => (
            <li key={check.name} className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="font-medium text-ink">{check.name}</p>
                <p className="text-sm text-ink-muted">{check.note}</p>
              </div>
              <span
                className={`shrink-0 font-mono text-sm font-medium ${STATUS_STYLES[check.status]}`}
              >
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
