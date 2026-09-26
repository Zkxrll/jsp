import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowLeftIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="site-shell">
      <div className="grid-overlay" aria-hidden="true" />

      <SiteHeader />

      <main className="wrap relative z-10 flex flex-1 flex-col items-center justify-center py-16 text-center">
        <p className="label label-accent">404</p>
        <h1 className="section-title mt-3">Page not found.</h1>
        <p className="lede mt-4 max-w-sm">
          This page doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className="btn btn-ghost mt-8">
          <ArrowLeftIcon />
          Back to home
        </Link>
      </main>

      <SiteFooter />
    </div>
  );
}
