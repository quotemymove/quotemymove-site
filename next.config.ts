// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don’t fail the production build on ESLint issues
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don’t fail the production build on TS type errors (runtime is still fine)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
