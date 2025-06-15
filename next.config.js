/** @type {import('next').NextConfig} */

const { DATABASE_URL = '' } = process.env
const nextConfig = {
  env: {
    DATABASE_URL,
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
}

module.exports = nextConfig
