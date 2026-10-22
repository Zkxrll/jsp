import Image from "next/image";
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
    { label: "Scripts", href: "/scripts" },
    { label: "Get Key", href: "/get-key" },
    { label: "Status", href: "/status" },
    siteConfig.links.docs ? { label: "Docs", href: siteConfig.links.docs } : null,
    siteConfig.links.discord ? { label: "Discord", href: siteConfig.links.discord } : null,
  ].filter((link): link is FooterLink => link !== null);

  return (
    <footer className="relative z-10 mt-8 border-t border-line">
      <div className="wrap flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/brand/zk-mark.webp" alt="" width={26} height={24} />
          <p className="text-sm text-ink-muted">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Footer">
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
