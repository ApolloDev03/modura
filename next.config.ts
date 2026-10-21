import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "admin.mvnlengineering.in",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "mvnlengineering.in",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "mvnl.salexo.co.in",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
