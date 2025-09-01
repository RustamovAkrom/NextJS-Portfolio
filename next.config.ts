import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
    images: {
    domains: ["i.pinimg.com"],
    unoptimized: true,
  },
};

export default nextConfig;
