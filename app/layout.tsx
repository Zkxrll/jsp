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
      <script
        src="https://quge5.com/88/tag.min.js" data-zone="266006" async data-cfasync="false">
      </script>
      
        {/* Supplied AdMaven display placement */}
        <meta name="admaven-placement" content="BqHw6rdCE" />

        {/* PopAds */}
        <Script
          id="popads"
          data-cfasync="false"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){var j=window,u="a946ec030fb2a368a1b60d68ac78edb3",c=[["siteId",944*942-330+4426463],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],l=["d3d3LnByZW1pdW12ZXJ0aXNpbmcuY29tL0R2ZC9kZGl2YS5taW4uanM=","ZDJqMDQyY2oxNDIxd2kuY2xvdWRmcm9udC5uZXQvVkVnVnYvcC93aW50ZXJjb29sZXIubWluLmNzcw=="],d=-1,v,g,z=function(){clearTimeout(g);d++;if(l[d]&&!(1813774913000<(new Date).getTime()&&1<d)){v=j.document.createElement("script");v.type="text/javascript";v.async=!0;var y=j.document.getElementsByTagName("script")[0];v.src="https://"+atob(l[d]);v.crossOrigin="anonymous";v.onerror=z;v.onload=function(){clearTimeout(g);j[u.slice(0,16)+u.slice(0,16)]||z()};g=setTimeout(z,5E3);y.parentNode.insertBefore(v,y)}};if(!j[u]){try{Object.freeze(j[u]=c)}catch(e){}z()})();
            `,
          }}
        />

        {/* Monetag supplied display / In-Page Push zone */}
        <Script
          id="monetag-display-ad"
          src="https://quge5.com/88/tag.min.js"
          data-zone="272042"
          data-cfasync="false"
          strategy="afterInteractive"
        />
      </head>

      <body className="min-h-dvh antialiased">
        <AdBlockGate />

        <PageTransition>
          {children}
        </PageTransition>

        {/* Existing Monetag zone */}
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
