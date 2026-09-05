import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['http://localhost.dev', 'localhost:3000', 'localhost.dev'],
  /* config options here */
};

export default nextConfig;
