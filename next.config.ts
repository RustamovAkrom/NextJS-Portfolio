import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
    images: {
    domains: ["akrom-omega.vercel.app"],
    unoptimized: true,
  },
};

export default nextConfig;
