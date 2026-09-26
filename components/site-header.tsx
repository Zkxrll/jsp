import Link from "next/link";
import { DiscordGlyph } from "./discord-glyph";
import { GetKeyButton } from "./get-key-button";
import { siteConfig } from "@/lib/config";

const NAV = [
  { label: "Features", href: "/#features" },
  { label: "Premium", href: "/#premium" },
  { label: "Updates", href: "/#updates" },
  { label: "FAQ", href: "/#faq" },
] as const;

/**
 * Sticky, translucent header. Wordmark, section nav (desktop), and the two
 * actions every page needs: Discord and Get Key. This is the only Discord
 * button in the chrome, so it is never stacked next to a duplicate.
 */
export function SiteHeader({ showGetKey = true }: { showGetKey?: boolean }) {
  return (
    <header className="site-header">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-display text-lg font-extrabold tracking-tight text-ink">
          {siteConfig.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.links.discord}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join the Zkx Hub Discord"
            className="btn btn-ghost btn-sm btn-icon sm:w-auto sm:px-4"
          >
            <DiscordGlyph />
            <span className="hidden sm:inline">Discord</span>
          </a>
          {showGetKey && <GetKeyButton size="sm" source="header" />}
        </div>
      </div>
    </header>
  );
}
