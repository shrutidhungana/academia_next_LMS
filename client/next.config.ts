import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // skip linting
  },
  typescript: {
    ignoreBuildErrors: true, // skip TS errors
  },
};

export default nextConfig;
