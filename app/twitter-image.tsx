import { siteConfig } from "@/lib/config";
import { renderShareImage } from "./opengraph-image";

export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default renderShareImage;
