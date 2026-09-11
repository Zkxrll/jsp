import Link from "next/link";
import { StatusPill } from "./status-pill";
import { siteConfig } from "@/lib/config";

export function SiteHeader() {
  return (
    <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-10 sm:py-6">
      <Link
        href="/"
        className="group flex items-center text-ink transition-all duration-300 hover:-translate-y-0.5"
      >
        <span className="font-display text-lg font-semibold tracking-[-0.02em]">
          {siteConfig.name}
        </span>
      </Link>
      <StatusPill />
    </header>
  );
}
