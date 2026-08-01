import { siteConfig, type ServiceStatus } from "@/lib/config";

const STATUS_COPY: Record<ServiceStatus, { label: string; dotClass: string }> = {
  operational: { label: "All systems operational", dotClass: "bg-online" },
  degraded: { label: "Degraded performance", dotClass: "bg-keyframe" },
  offline: { label: "Key system offline", dotClass: "bg-danger" },
};

/** Small status pill in the header. Links through to the full /status page. */
export function StatusPill() {
  const { label, dotClass } = STATUS_COPY[siteConfig.status];

  return (
    <a
      href="/status"
      className="group inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface/60 px-3 py-1.5 font-mono text-xs text-ink-muted transition-colors hover:border-ink-muted hover:text-ink"
    >
      <span className={`h-2 w-2 shrink-0 animate-pulse-soft rounded-full ${dotClass}`} />
      <span className="hidden sm:inline">{label}</span>
      <span
        className="text-ink-muted/60 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        →
      </span>
    </a>
  );
}
