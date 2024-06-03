/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.kanojodb.com',
      },
    ],
  },
};

export default nextConfig;
