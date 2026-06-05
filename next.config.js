/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent Turbopack from bundling server-only packages — fixes Vercel "Module not found"
  serverExternalPackages: ['mongoose', 'bcryptjs', 'cloudinary', 'jose', 'zod'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  // Empty turbopack config silences the webpack-vs-turbopack warning
  turbopack: {},
}

module.exports = nextConfig
