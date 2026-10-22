"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DiscordGlyph } from "./discord-glyph";
import { GetKeyButton } from "./get-key-button";
import { ArrowRightIcon, CloseIcon, MenuIcon } from "./icons";
import { siteConfig } from "@/lib/config";

const NAV = [
  { id: "features", label: "Features" },
  { id: "premium", label: "Premium" },
  { id: "updates", label: "Updates" },
  { id: "faq", label: "FAQ" },
] as const;

type SectionId = (typeof NAV)[number]["id"];
type NavId = SectionId | "scripts";

/** Horizontal padding of .nav-link; the indicator spans the text only. */
const LINK_INSET = 14;

/** Which home-page section is under the middle of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;

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
      setActive(null);
    };
  }, [enabled]);

  return enabled ? active : null;
}

/** True once the page has scrolled, so the header can show its edge. */
function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}

/** Fixed header shared by every route. */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);
  const active: NavId | null = activeSection ?? (pathname === "/scripts" ? "scripts" : null);
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const linkRefs = useRef<Partial<Record<NavId, HTMLAnchorElement | null>>>({});
  const [lens, setLens] = useState<{ x: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = active ? linkRefs.current[active] : null;
      setLens(el ? { x: el.offsetLeft + LINK_INSET, width: el.offsetWidth - LINK_INSET * 2 } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  // The phone menu closes on Escape (focus back to its button), on a tap
  // outside the header, and when the layout grows past the phone menu.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const wide = window.matchMedia("(min-width: 768px)");
    const onWide = () => {
      if (wide.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      wide.removeEventListener("change", onWide);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const backTypes = isHome ? undefined : ["nav-back"];

  return (
    <header
      ref={headerRef}
      className="site-header"
      data-scrolled={scrolled}
      data-menu-open={menuOpen}
    >
      <div className="wrap site-header-inner">
        <Link href="/" transitionTypes={backTypes} className="brand" onClick={closeMenu}>
          <Image src="/brand/zk-mark.webp" alt="" width={30} height={28} priority />
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
              transitionTypes={backTypes}
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
            transitionTypes={isHome ? ["nav-forward"] : undefined}
            aria-current={active === "scripts" ? "true" : undefined}
            className="nav-link"
          >
            Scripts
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.links.discord}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join the Zkx Hub Discord"
            className="btn btn-secondary btn-sm btn-icon hidden sm:inline-flex"
          >
            <DiscordGlyph />
          </a>
          {pathname !== "/get-key" && <GetKeyButton size="sm" source="header" />}
          <button
            ref={menuButtonRef}
            type="button"
            className="btn btn-secondary btn-sm btn-icon md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Main" className="mobile-menu md:hidden">
          <div className="wrap py-2">
            {NAV.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                transitionTypes={backTypes}
                aria-current={active === item.id ? "true" : undefined}
                className="mobile-menu-link"
                onClick={closeMenu}
              >
                {item.label}
                <ArrowRightIcon />
              </Link>
            ))}
            <Link
              href="/scripts"
              transitionTypes={isHome ? ["nav-forward"] : undefined}
              aria-current={pathname === "/scripts" ? "true" : undefined}
              className="mobile-menu-link"
              onClick={closeMenu}
            >
              Scripts
              <ArrowRightIcon />
            </Link>
            <a
              href={siteConfig.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-menu-link"
              onClick={closeMenu}
            >
              Discord
              <DiscordGlyph />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
