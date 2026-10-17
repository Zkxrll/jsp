import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep this file intentionally small. Vercel needs zero extra
  // configuration to build and deploy a standard Next.js app — add
  // options here only when a specific feature actually requires them.
  async rewrites() {
    return [
      { source: "/config", destination: "/config/index.htm" },
      { source: "/config/", destination: "/config/index.htm" },
    ];
  },
};

export default nextConfig;
