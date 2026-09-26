import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * 1200×630 share card. Rendered once at build time. Shared by
 * twitter-image.tsx so both previews stay identical.
 */
export async function renderShareImage() {
  const logo = await readFile(join(process.cwd(), "public/logo.jpg"));
  const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 96px",
          background:
            "radial-gradient(900px 520px at 22% 40%, rgba(154, 92, 255, 0.22), transparent 70%), #060509",
          color: "#f4f1fb",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={320} height={320} alt="" style={{ borderRadius: 320 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 620 }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4, color: "#b892ff" }}>
            RIVALS SCRIPT
          </div>
          <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.35, color: "#c9c3d6" }}>{siteConfig.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}

export default renderShareImage;
