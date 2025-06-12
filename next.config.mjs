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
  transpilePackages: ['framer-motion']
};

export default nextConfig;