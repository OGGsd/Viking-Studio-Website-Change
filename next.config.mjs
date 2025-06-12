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
  experimental: {
    esmExternals: 'loose'
  }
};

export default nextConfig;