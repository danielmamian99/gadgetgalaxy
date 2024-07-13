/** @type {import('next').NextConfig} */

const { DATABASE_URL = '' } = process.env
const nextConfig = {
  env: {
    DATABASE_URL
  },
  images: {
    domains: ['www.mouser.com', 'barcodes.conekta.com']
  }
}

module.exports = nextConfig
