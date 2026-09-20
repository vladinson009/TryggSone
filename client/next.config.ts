import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: [process.env.DEV_ORIGIN ?? 'localhost.dev'],
  /* config options here */
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
