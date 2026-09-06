import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: [process.env.DEV_ORIGIN ?? 'localhost.dev'],
  /* config options here */
};

export default nextConfig;
