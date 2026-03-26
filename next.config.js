/** @type {import('next').NextConfig} */
const nextConfig = {
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
