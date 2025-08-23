/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_ANIM: process.env.NEXT_PUBLIC_ANIM || '1',
  },
  async rewrites() {
    return [
      { source: '/pages/products.html', destination: '/pages/products' },
      { source: '/pages/about.html', destination: '/pages/about' },
      { source: '/products.html', destination: '/pages/products' },
      { source: '/about.html', destination: '/pages/about' },
    ];
  },
};

module.exports = nextConfig;