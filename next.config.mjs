/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['vikingsalong.axiestudio.se'],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    buildExcludes: [
      /middleware-manifest.json$/,
      /_buildManifest.js$/,
      /_ssgManifest.js$/
    ]
  }
};

export default withPWA(nextConfig);
