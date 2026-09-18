import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { siteConfig } from "@/lib/config";
import "./globals.css";
import { AdBlockGate } from "@/components/adblock-gate";
import { PageTransition } from "@/components/page-transition";
import { ServiceWorkerRegister } from "@/components/sw-register";
import { MonetagScript } from "@/components/monetag-script";
import { PopAdsScript } from "@/components/popads-script";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  other: {
    "admaven-placement": "1539759",
    "monetag": "56c5ac3660d10332ebc79bc7b9892566",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: "/logo.jpg", width: 1024, height: 1024, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050409",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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

        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
