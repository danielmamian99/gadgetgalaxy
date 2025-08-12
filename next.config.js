/** @type {import('next').NextConfig} */

const {
  DATABASE_URL = '',
  WEB_SOCKET_URL = '',
  NEXT_PUBLIC_WEB_SOCKET_URL = '',
} = process.env
const nextConfig = {
  env: {
    DATABASE_URL,
    WEB_SOCKET_URL,
    NEXT_PUBLIC_WEB_SOCKET_URL,
  },
  images: {
    domains: [
      'www.mouser.com',
      'barcodes.conekta.com',
      'lh3.googleusercontent.com',
      'media.wiggot.mx',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
    }
    return config
  },
}

module.exports = nextConfig
