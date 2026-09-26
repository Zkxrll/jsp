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
      // A thin band across the middle of the screen: a section is active
      // while it crosses it.
      { rootMargin: "-45% 0px -54% 0px" },
    );

    sections.forEach((el) => observer.observe(el));

    // Above the first section (the hero), nothing is active.
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

/**
 * Floating glass capsule. Lives in the root layout, so it persists across
 * routes and never re-animates. On the home page, a lens slides behind the
 * section currently in view.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);

  const linkRefs = useRef<Partial<Record<SectionId, HTMLAnchorElement | null>>>({});
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
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.links.discord}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join the Zkx Hub Discord"
            className="btn btn-glass btn-sm btn-icon"
          >
            <DiscordGlyph />
          </a>
          {pathname !== "/get-key" && <GetKeyButton size="sm" source="header" />}
        </div>
      </div>
    </header>
  );
}
