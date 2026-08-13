import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/config";

export default function GetKeyPage() {
  return (
    <div className="site-shell relative min-h-dvh overflow-hidden">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <SiteHeader />

      <main className="relative z-10 flex min-h-[calc(100dvh-160px)] items-center justify-center px-6 py-16">
        <section className="w-full max-w-xl">
          <div className="animate-rise rounded-2xl border border-surface-border bg-surface p-7 shadow-2xl sm:p-9">
            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl border border-keyframe/20 bg-keyframe/10 text-keyframe">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M11 11l8 8M16 16l2.5 2.5M19 13l2.5 2.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="eyebrow">KEY ACCESS</p>

            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Get your key.
            </h1>

            <p className="mt-4 text-sm leading-7 text-ink-muted sm:text-base">
              Join the Zkx Hub Discord first to stay updated with releases,
              announcements, and support. Then continue to the key system.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={siteConfig.links.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#5865F2]/30 bg-[#5865F2]/10 px-5 py-4 font-display text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5865F2]/60 hover:bg-[#5865F2]/15"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[#7289da]"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19.54 0c.44 0 .84.25 1.03.64 1.42 2.85 2.1 6.01 1.98 9.19-.02.36-.2.7-.49.93-2.1 1.67-4.52 2.9-7.1 3.61-.29.08-.6.02-.82-.16-.36-.3-.71-.63-1.03-.98-.1-.11-.25-.17-.39-.14-1.8.41-3.66.41-5.46 0-.14-.03-.29.02-.39.14-.32.35-.67.68-1.03.98-.22.18-.53.24-.82.16a20.06 20.06 0 0 1-7.1-3.61c-.29-.23-.47-.57-.49-.93C.1 6.65.78 3.49 2.2.64.39.25.79 0 1.23 0h2.36c.43 0 .83.23 1.04.6.18.32.34.65.49.98a16.53 16.53 0 0 1 9.76 0c.15-.33.31-.66.49-.98.21-.37.61-.6 1.04-.6h2.36ZM8.28 8.82c-1.08 0-1.96.95-1.96 2.11s.88 2.11 1.96 2.11 1.97-.95 1.97-2.11-.89-2.11-1.97-2.11Zm7.44 0c-1.08 0-1.97.95-1.97 2.11s.89 2.11 1.97 2.11 1.96-.95 1.96-2.11-.88-2.11-1.96-2.11Z" />
                </svg>
                Join the Zkx Hub Discord
              </a>

              <a
                href={siteConfig.keySystemUrl}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-keyframe px-5 py-4 font-display text-sm font-semibold text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-keyframe-strong"
              >
                Continue to Key System
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="mt-6 border-t border-surface-border pt-5">
              <p className="text-center text-xs leading-5 text-ink-muted">
                By continuing, you confirm that you have joined the Discord
                server.
              </p>
            </div>

            <Link
              href="/"
              className="mt-5 block text-center text-xs text-ink-muted transition-colors hover:text-ink"
            >
              ← Back to Zkx Hub
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
