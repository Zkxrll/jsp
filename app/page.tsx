import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GetKeyButton } from "@/components/get-key-button";
import { FAQ } from "@/components/faq";
import { CursorGlow } from "@/components/cursor-glow";
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
      <CursorGlow />

      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <SiteHeader />

      <main className="relative z-10">
        <section className="mx-auto flex min-h-[calc(100dvh-96px)] max-w-7xl flex-col items-center justify-center px-5 pb-20 pt-14 text-center sm:px-8 lg:px-10">
          <div className="hero-badge animate-rise">
            <span className="status-dot" />
            <span>Premium-ready script hub</span>
            <span className="hero-badge-arrow">↗</span>
          </div>

          <div
            className="mt-8 animate-rise"
            style={{ animationDelay: "80ms" }}
          >
            <h1 className="hero-title">
              Zkx Hub
            </h1>

            <p className="hero-description mx-auto mt-6 max-w-2xl">
              {siteConfig.tagline} Built with a clean interface, smooth
              interactions, and everything you need in one place.
            </p>
          </div>

          <div
            className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4 animate-rise"
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
              <span className="hero-stat-label">Lifetime Premium</span>
            </div>
          </div>

          <section className="content-section animate-rise">
            <div className="section-heading">
              <div>
                <p className="eyebrow text-left">FEATURES</p>

                <h2 className="section-title text-left">
                  Everything you need.
                </h2>
              </div>

              <p className="section-description hidden max-w-sm text-right md:block">
                Designed to stay clean, fast, and easy to use.
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {FEATURES.map((feature) => (
                <article
                  key={feature.label}
                  className="feature-card group"
                >
                  <div className="feature-icon">
                    {feature.icon}
                  </div>

                  <p className="feature-label">
                    {feature.label}
                  </p>

                  <h3 className="feature-title">
                    {feature.title}
                  </h3>

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

          {/* SYSTEM STATUS */}
          <section className="content-section">
            <div className="info-card">
              <div className="info-card-header">
                <div>
                  <p className="eyebrow text-left">SYSTEM</p>

                  <h2 className="info-card-title">
                    Service status
                  </h2>
                </div>

                <div className="status-pill">
                  <span className="status-dot" />
                  Operational
                </div>
              </div>

              <div className="status-grid">
                {[
                  "Key System",
                  "Discord",
                  "Zkx Hub",
                ].map((service) => (
                  <div
                    key={service}
                    className="status-row"
                  >
                    <span>{service}</span>

                    <span className="status-ok">
                      <span className="status-dot" />
                      Operational
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PREMIUM */}
          <section className="content-section">
            <div className="premium-panel">
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
                    Unlock Premium with a one-time purchase. No recurring
                    payment.
                  </p>

                  <div className="premium-benefits">
                    <span>✓ Lifetime access</span>
                    <span>✓ One-time purchase</span>
                    <span>✓ Premium access</span>
                    <span>✓ Priority support</span>
                  </div>
                </div>

                <Link
                  href="https://zkx.mysellauth.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-panel-button"
                >
                  Get Lifetime Premium
                  <span>↗</span>
                </Link>
              </div>
            </div>
          </section>

          {/* DISCORD */}
          <section className="content-section">
            <div className="discord-card">
              <div>
                <p className="eyebrow text-left">
                  COMMUNITY
                </p>

                <h2 className="info-card-title">
                  Join the Zkx Hub Discord.
                </h2>

                <p className="section-description mt-3 max-w-xl text-left">
                  Get updates, announcements, support, and release
                  information directly from the community.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a
                  href={siteConfig.links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="discord-button"
                >
                  Join Discord
                  <span>↗</span>
                </a>

                <CopyDiscordButton />
              </div>
            </div>
          </section>

          {/* CHANGELOG */}
          <section className="content-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow text-left">
                  UPDATES
                </p>

                <h2 className="section-title text-left">
                  Latest changes.
                </h2>
              </div>
            </div>

            <div className="changelog-list">
              <article className="changelog-item">
                <div className="changelog-version">
                  <span>v1.0.10</span>
                  <span>Latest</span>
                </div>

                <div>
                  <h3 className="changelog-title">
                    Performance & UI refresh
                  </h3>

                  <p className="changelog-description">
                    Improved page responsiveness, smoother interactions,
                    refreshed key access flow, and better mobile spacing.
                  </p>
                </div>
              </article>

              <article className="changelog-item">
                <div className="changelog-version">
                  <span>Recent</span>
                </div>

                <div>
                  <h3 className="changelog-title">
                    Premium access
                  </h3>

                  <p className="changelog-description">
                    Added lifetime Premium access with a dedicated purchase
                    flow.
                  </p>
                </div>
              </article>
            </div>
          </section>

          {/* FAQ */}
          <section className="content-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow text-left">
                  FAQ
                </p>

                <h2 className="section-title text-left">
                  Questions?
                </h2>
              </div>
            </div>

            <div className="mt-7">
              <FAQ />
            </div>
          </section>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function CopyDiscordButton() {
  async function copyInvite() {
    try {
      await navigator.clipboard.writeText(
        siteConfig.links.discord
      );

      const button = document.getElementById(
        "copy-discord-button"
      );

      if (!button) return;

      button.dataset.copied = "true";

      window.setTimeout(() => {
        button.dataset.copied = "false";
      }, 1800);
    } catch {
      // Clipboard can be unavailable in restricted browsers.
    }
  }

  return (
    <button
      id="copy-discord-button"
      type="button"
      onClick={copyInvite}
      className="copy-button"
      aria-label="Copy Discord invite"
    >
      <span className="copy-default">
        Copy Invite
      </span>

      <span className="copy-success">
        Copied ✓
      </span>
    </button>
  );
}
