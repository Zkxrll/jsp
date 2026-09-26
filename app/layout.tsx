import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/config";
import "./globals.css";
import { AdBlockGate } from "@/components/adblock-gate";
import { PointerLight } from "@/components/pointer-light";
import { SiteHeader } from "@/components/site-header";
import { ServiceWorkerRegister } from "@/components/sw-register";
import { MonetagScript } from "@/components/monetag-script";
import { PopAdsScript } from "@/components/popads-script";

// One family with optical sizing: display sizes get tighter, sturdier
// letterforms automatically, the way SF Pro Display / Text split works.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", axes: ["opsz"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · Rivals script`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  other: {
    "admaven-placement": "1539759",
    "monetag": "56c5ac3660d10332ebc79bc7b9892566",
  },
  // Images come from app/opengraph-image.tsx and app/twitter-image.tsx.
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#060509",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Monetag Multitag, client-side except in Safari (Vignette behavior). */}
        <MonetagScript />

        {/* AdMaven placement 1593806 */}
        <meta name="admaven-placement" content="BqHw6rdCE" />
        <Script
          id="admaven-placement"
          src="https://dcbbwymp1bhlf.cloudfront.net/?wbbcd=1593806"
          data-cfasync="false"
          strategy="afterInteractive"
        />
      </head>

      <body className="min-h-dvh antialiased">
        <ServiceWorkerRegister />
        <AdBlockGate />

        {/* PopAds, injected on the client to avoid the next/script head crash. */}
        <PopAdsScript />

        <PointerLight />

        <div className="site-shell">
          <div className="aurora" aria-hidden="true" />
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
