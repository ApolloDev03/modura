<<<<<<< HEAD
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
=======
/** @type {import('next').NextConfig} */
const nextConfig = {
>>>>>>> origin/main
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
<<<<<<< HEAD
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
=======
>>>>>>> origin/main
        hostname: "mvnl.salexo.co.in",
        pathname: "/uploads/**",
      },
    ],
  },
};

<<<<<<< HEAD
export default nextConfig;
=======
export default nextConfig;
>>>>>>> origin/main
