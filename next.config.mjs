/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/utils/image-loader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.kanojodb.com',
      },
    ],
  },
};

export default nextConfig;
