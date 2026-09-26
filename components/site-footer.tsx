import Link from "next/link";
import { siteConfig } from "@/lib/config";
// import { AdSlot } from "@/lib/ads/ad-slot";

interface FooterLink {
  label: string;
  href: string;
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  const links: FooterLink[] = [
    { label: "Get Key", href: "/get-key" },
    { label: "Status", href: "/status" },
    siteConfig.links.docs ? { label: "Docs", href: siteConfig.links.docs } : null,
    siteConfig.links.discord ? { label: "Discord", href: siteConfig.links.discord } : null,
  ].filter((link): link is FooterLink => link !== null);

  return (
    <footer className="relative z-10 mt-16 border-t border-white/5">
      <div className="wrap flex flex-col items-center gap-4 py-8 text-sm text-ink-muted sm:flex-row sm:justify-between">
        <p>
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <nav className="flex items-center gap-6" aria-label="Footer">
          {links.map((link) =>
            link.href.startsWith("http") ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} transitionTypes={["nav-forward"]} className="text-link">
                {link.label}
              </Link>
            ),
          )}
        </nav>
      </div>

      {/* Reserved slot for a footer ad unit once a provider is registered
          in lib/ads/ad-slot.tsx — see lib/ads/README.md. Renders nothing
          until then. */}
      {/* <AdSlot slot="footer" className="mx-auto mt-6 max-w-3xl" /> */}
    </footer>
  );
}
