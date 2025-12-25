import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
        // port: '',
        // pathname: '/my-bucket/**',
        // search: '',
      },
    ],
  },
};

export default nextConfig;
