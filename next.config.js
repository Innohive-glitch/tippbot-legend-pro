/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/tippbot-legend-pro',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig 