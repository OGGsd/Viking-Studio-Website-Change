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
  // Remove experimental options that are causing issues
  swcMinify: true,
  // Ensure proper module resolution
  transpilePackages: ['framer-motion']
};

export default nextConfig;