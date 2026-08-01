import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-mono text-sm text-keyframe">404</p>
        <h1 className="font-display text-2xl font-semibold text-ink">Nothing on this frame.</h1>
        <p className="max-w-sm text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist, or moved.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-lg border border-surface-border px-4 py-2 text-sm text-ink transition-colors hover:border-ink-muted"
        >
          Back home
        </Link>
      </main>

      <SiteFooter />
    </div>
  );
}
