import Link from "next/link";
import { Logo } from "./logo";
import { StatusPill } from "./status-pill";
import { siteConfig } from "@/lib/config";

export function SiteHeader() {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
      <Link
        href="/"
        className="flex items-center gap-2.5 text-ink transition-opacity hover:opacity-80"
      >
        <Logo className="h-7 w-7 text-keyframe" />
        <span className="font-display text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </span>
      </Link>
      <StatusPill />
    </header>
  );
}
