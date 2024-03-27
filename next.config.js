/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'gravatar.com'
      }, 
      {
        hostname: 'eoimages.gsfc.nasa.gov'
      }
    ],
  }
}

module.exports = nextConfig;