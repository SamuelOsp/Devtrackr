import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.BUILD_STANDALONE === 'true' ? { output: 'standalone' as const } : {}),
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: `${process.env.API_BACKEND_URL || 'http://localhost:3000'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
