import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { siteConfig } from "@/lib/config";
import "./globals.css";
import { AdBlockGate } from "@/components/adblock-gate";
import { PageTransition } from "@/components/page-transition";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
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
  themeColor: "#0a0e14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <Script
          id="admaven-placement"
          src="https://dcbbwymp1bhlf.cloudfront.net/?wbbcd=1539759"
          data-cfasync="false"
          strategy="afterInteractive"
        />
      </head>

      <body className="min-h-dvh antialiased">
        <AdBlockGate />

        <PageTransition>
          {children}
        </PageTransition>

        <Script
          id="monetag-ad"
          src="https://quge5.com/88/tag.min.js"
          data-zone="266006"
          data-cfasync="false"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
