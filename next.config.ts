import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // GitHub Pagesの場合は basePath: '/concert-venues' を追加
  // Cloudflare Pagesの場合は basePath は不要
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
