import Link from "next/link";
import { Logo } from "./logo";
import { StatusPill } from "./status-pill";
import { siteConfig } from "@/lib/config";

export function SiteHeader() {
  return (
    <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-10 sm:py-6">
      <Link
        href="/"
        className="group flex items-center gap-2.5 text-ink transition-all duration-300 hover:-translate-y-0.5"
      >
        <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-[#9a5cff]/15 bg-[#9a5cff]/[0.045] shadow-[0_0_26px_rgba(154,92,255,0.08)] transition-all duration-500 group-hover:border-[#c09bff]/30 group-hover:bg-[#9a5cff]/[0.08] group-hover:shadow-[0_0_32px_rgba(154,92,255,0.14)]">
          <Logo className="h-7 w-7 text-[#c09bff] transition-transform duration-500 group-hover:scale-105" />
        </span>
        <span className="font-display text-lg font-semibold tracking-[-0.02em]">
          {siteConfig.name}
        </span>
      </Link>
      <StatusPill />
    </header>
  );
}
