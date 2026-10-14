import type { NextConfig } from "next";
import aliases from "./data/config/canonical-tutoring-aliases.json";

const nextConfig: NextConfig = {
  experimental: {
    // The project contains more than a thousand static routes. A single worker
    // keeps Windows from exhausting its per-process file handle limit at build time.
    cpus: 1,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return aliases.map(({ source, target: destination }) => ({
      source,
      destination,
      statusCode: 301 as const,
    }));
  },
};

export default nextConfig;
