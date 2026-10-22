"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DiscordGlyph } from "./discord-glyph";
import { GetKeyButton } from "./get-key-button";
import { siteConfig } from "@/lib/config";

const NAV = [
  { id: "features", label: "Features" },
  { id: "premium", label: "Premium" },
  { id: "updates", label: "Updates" },
  { id: "faq", label: "FAQ" },
] as const;

type SectionId = (typeof NAV)[number]["id"];
type NavId = SectionId | "scripts";

/** Which home-page section is under the middle of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );

    sections.forEach((el) => observer.observe(el));

    const onScroll = () => {
      const first = sections[0];
      if (first && first.getBoundingClientRect().top > window.innerHeight / 2) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);

  return active;
}

/** Floating glass capsule shared by every route. */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);
  const active: NavId | null =
    activeSection ?? (pathname === "/scripts" ? "scripts" : null);

  const linkRefs = useRef<Partial<Record<NavId, HTMLAnchorElement | null>>>({});
  const [lens, setLens] = useState<{ x: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = active ? linkRefs.current[active] : null;
      setLens(el ? { x: el.offsetLeft, width: el.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <header className="site-header glass">
      <div className="site-header-inner">
        <Link
          href="/"
          transitionTypes={isHome ? undefined : ["nav-back"]}
          className="text-[1.0625rem] font-bold tracking-tight text-ink"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Main" className="nav hidden md:flex">
          <span
            className="nav-indicator"
            aria-hidden="true"
            style={{
              transform: `translateX(${lens?.x ?? 0}px)`,
              width: lens?.width ?? 0,
              opacity: lens ? 1 : 0,
            }}
          />
          {NAV.map((item) => (
            <Link
              key={item.id}
              ref={(el) => {
                linkRefs.current[item.id] = el;
              }}
              href={`/#${item.id}`}
              transitionTypes={isHome ? undefined : ["nav-back"]}
              aria-current={active === item.id ? "true" : undefined}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
          <Link
            ref={(el) => {
              linkRefs.current.scripts = el;
            }}
            href="/scripts"
            transitionTypes={isHome ? undefined : ["nav-back"]}
            aria-current={active === "scripts" ? "true" : undefined}
            className="nav-link"
          >
            Scripts
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/scripts"
            aria-current={pathname === "/scripts" ? "page" : undefined}
            className="nav-link md:hidden"
          >
            Scripts
          </Link>
          <a
            href={siteConfig.links.discord}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join the Zkx Hub Discord"
            className="btn btn-glass btn-sm btn-icon hidden sm:inline-flex"
          >
            <DiscordGlyph />
          </a>
          {pathname !== "/get-key" && <GetKeyButton size="sm" source="header" />}
        </div>
      </div>
    </header>
  );
}
