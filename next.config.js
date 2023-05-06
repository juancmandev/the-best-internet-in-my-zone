/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ['upload.wikimedia.org'],
  },
};

module.exports = nextConfig;
