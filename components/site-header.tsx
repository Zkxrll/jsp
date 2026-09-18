import Link from "next/link";
import { DiscordGlyph } from "./discord-glyph";
import { siteConfig } from "@/lib/config";

/**
 * Site header. Wordmark on the left, a Discord button on the right so joining
 * is one click from any page. No status indicators.
 */
export function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between px-5 py-4 sm:px-8">
      <Link
        href="/"
        className="font-display text-lg font-black tracking-tight text-ink transition-opacity duration-200 hover:opacity-80"
      >
        Zkx Hub
      </Link>

      <a
        href={siteConfig.links.discord}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-discord px-4 py-2.5 text-xs"
      >
        <DiscordGlyph className="h-4 w-4" />
        <span className="hidden sm:inline">Join Discord</span>
        <span className="sm:hidden">Discord</span>
      </a>
    </header>
  );
}
