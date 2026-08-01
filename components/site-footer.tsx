import { siteConfig } from "@/lib/config";
// import { AdSlot } from "@/lib/ads/ad-slot";

interface FooterLink {
  label: string;
  href: string;
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  const links: FooterLink[] = [
    siteConfig.links.discord ? { label: "Discord", href: siteConfig.links.discord } : null,
    siteConfig.links.docs ? { label: "Docs", href: siteConfig.links.docs } : null,
    { label: "Status", href: "/status" },
  ].filter((link): link is FooterLink => link !== null);

  return (
    <footer className="relative z-10 border-t border-surface-border px-6 py-8 sm:px-10">
      <div className="flex flex-col items-center gap-4 text-sm text-ink-muted sm:flex-row sm:justify-between">
        <p>
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <nav className="flex items-center gap-5" aria-label="Footer">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-ink"
              {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Reserved slot for a footer ad unit once a provider is registered
          in lib/ads/ad-slot.tsx — see lib/ads/README.md. Renders nothing
          until then. */}
      {/* <AdSlot slot="footer" className="mx-auto mt-6 max-w-3xl" /> */}
    </footer>
  );
}
