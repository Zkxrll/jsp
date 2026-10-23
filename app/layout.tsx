import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Archivo, Inter } from "next/font/google";
import { siteConfig } from "@/lib/config";
import "./globals.css";
import { AdBlockGate } from "@/components/adblock-gate";
import { SiteHeader } from "@/components/site-header";
import { ServiceWorkerRegister } from "@/components/sw-register";
import { MonetagScript } from "@/components/monetag-script";
import { PopAdsScript } from "@/components/popads-script";

// Inter for reading, with optical sizing. Archivo for display: its width
// axis gives the condensed, uppercase headings their game-title cut.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", axes: ["opsz"] });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap", axes: ["wdth"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · Roblox script hub`,
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
  themeColor: "#08070b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
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

        <div className="site-shell">
          <div className="backlight" aria-hidden="true" />
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
