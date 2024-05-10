/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'gravatar.com'
      },
      {
        hostname: 'cdn.walkin.city'
      }
    ],
  }
}

module.exports = nextConfig;
