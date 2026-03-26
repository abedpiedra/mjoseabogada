/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // Experimental features
  experimental: {
    serverComponentsExternalPackages: ['whatsapp-web.js'],
  },

  // Image optimization
  images: {
    unoptimized: true,
  },

  // Environment variables available at runtime
  env: {
    CONTACT_PHONE: process.env.CONTACT_PHONE,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  },
}

module.exports = nextConfig
