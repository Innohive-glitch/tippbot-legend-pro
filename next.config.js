/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'docs',
  basePath: '/tippbot-legend-pro',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 