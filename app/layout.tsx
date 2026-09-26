import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Archivo, Inter } from "next/font/google";
import { siteConfig } from "@/lib/config";
import "./globals.css";
import { AdBlockGate } from "@/components/adblock-gate";
import { ServiceWorkerRegister } from "@/components/sw-register";
import { MonetagScript } from "@/components/monetag-script";
import { PopAdsScript } from "@/components/popads-script";

// One display face, one body face. Both variable, self-hosted by next/font,
// so headings render the same on every device instead of falling back to
// whatever "Arial Black" resolves to.
const display = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// Runs before first paint. Opts the page into scroll-reveal only when motion
// is allowed, so revealed content never flashes visible and then hides. If
// the page never hydrates, a timeout shows everything rather than leaving it
// hidden.
const REVEAL_BOOTSTRAP = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&"IntersectionObserver"in window){var d=document.documentElement;d.classList.add("reveal-on");setTimeout(function(){if(!d.dataset.revealReady)d.classList.remove("reveal-on")},4000)}}catch(e){}`;

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
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOTSTRAP }} />

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

        {children}
      </body>
    </html>
  );
}
