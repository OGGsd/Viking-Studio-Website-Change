/** @type {import('next').NextConfig} */
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
  // Ensure proper module resolution
  transpilePackages: ['framer-motion'],
  // Fix for client-side routing issues
  experimental: {
    appDir: true,
  },
};

export default nextConfig;