import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GetKeyButton } from "@/components/get-key-button";
import { siteConfig } from "@/lib/config";

const FEATURES = [
  {
    label: "Aimbot",
    title: "Precision targeting",
    description:
      "Smooth target tracking with configurable prioritization and responsive aiming controls.",
    icon: "⌁",
  },
  {
    label: "ESP",
    title: "See everything",
    description:
      "Clean visual indicators with customizable information so you always know what is around you.",
    icon: "◈",
  },
  {
    label: "UnlockALL",
    title: "Full access",
    description:
      "Access available cosmetics, including content normally reserved for administrators.",
    icon: "✦",
  },
] as const;

export default function HomePage() {
  return (
    <div className="site-shell relative min-h-dvh overflow-hidden">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />

      <div className="grid-overlay" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <SiteHeader />

      <main className="relative z-10">
        <section className="mx-auto flex min-h-[calc(100dvh-96px)] max-w-7xl flex-col items-center justify-center px-6 pb-20 pt-16 text-center sm:px-10 lg:pt-10">
          <div className="hero-badge animate-rise">
            <span className="status-dot" />
            <span>Premium-ready script hub</span>
            <span className="hero-badge-arrow">↗</span>
          </div>

          <div
            className="mt-8 animate-rise"
            style={{ animationDelay: "80ms" }}
          >
            <p className="eyebrow">ZKX HUB</p>

            <h1 className="hero-title mt-4">
              Play smarter.
              <br />
              <span>Play different.</span>
            </h1>

            <p className="hero-description mx-auto mt-6 max-w-2xl">
              {siteConfig.tagline} Built with a clean interface, smooth
              interactions, and everything you need in one place.
            </p>
          </div>

          <div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row animate-rise"
            style={{ animationDelay: "160ms" }}
          >
            <div className="hero-cta">
              <GetKeyButton />
            </div>

            <Link
              href="https://zkx.mysellauth.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button"
            >
              <span className="premium-button-glow" />
              <span className="premium-button-content">
                <span className="premium-icon">✦</span>
                <span>
                  <strong>Lifetime Premium</strong>
                  <small>One-time purchase</small>
                </span>
                <span className="premium-arrow">→</span>
              </span>
            </Link>
          </div>

          <div
            className="hero-stats animate-rise"
            style={{ animationDelay: "240ms" }}
          >
            <div className="hero-stat">
              <span className="hero-stat-value">03</span>
              <span className="hero-stat-label">Core features</span>
            </div>

            <div className="hero-stat-divider" />

            <div className="hero-stat">
              <span className="hero-stat-value">24/7</span>
              <span className="hero-stat-label">Access</span>
            </div>

            <div className="hero-stat-divider" />

            <div className="hero-stat">
              <span className="hero-stat-value">∞</span>
              <span className="hero-stat-label">Premium lifetime</span>
            </div>
          </div>

          <section
            className="mt-20 w-full max-w-6xl animate-rise"
            style={{ animationDelay: "320ms" }}
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow text-left">FEATURES</p>
                <h2 className="section-title text-left">
                  Everything you need.
                </h2>
              </div>

              <p className="section-description hidden max-w-sm text-right md:block">
                Designed to stay clean, fast, and easy to use without covering
                the screen in unnecessary clutter.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {FEATURES.map((feature, index) => (
                <article
                  key={feature.label}
                  className="feature-card group"
                  style={{
                    animationDelay: `${360 + index * 80}ms`,
                  }}
                >
                  <div className="feature-card-shine" />

                  <div className="feature-icon">{feature.icon}</div>

                  <p className="feature-label">{feature.label}</p>
                  <h3 className="feature-title">{feature.title}</h3>

                  <p className="feature-description">
                    {feature.description}
                  </p>

                  <div className="feature-footer">
                    <span>Explore</span>
                    <span className="feature-arrow">↗</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            className="premium-panel animate-rise"
            style={{ animationDelay: "440ms" }}
          >
            <div className="premium-panel-background" />
            <div className="premium-panel-content">
              <div>
                <div className="premium-label">
                  <span>✦</span>
                  PREMIUM
                </div>

                <h2 className="premium-title">
                  One key.
                  <br />
                  <span>Lifetime access.</span>
                </h2>

                <p className="premium-description">
                  Skip the hassle and unlock Premium permanently with a single
                  purchase.
                </p>
              </div>

              <Link
                href="https://zkx.mysellauth.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="premium-panel-button"
              >
                Get Premium
                <span>↗</span>
              </Link>
            </div>
          </section>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
