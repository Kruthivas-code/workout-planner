import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["lh3.googleusercontent.com", "192.168.1.12", "localhost", "www.facebook.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
    ],
  },
  experimental: {
    allowedDevOrigins: [
      "c3af22fa-76c4-45c5-a001-c3b04f32c991.preview.emergentagent.com",
      "workout-buddy-56.preview.emergentagent.com",
      "7eb72daa-d1ef-4717-bee1-7f88d145574d.preview.emergentagent.com",
      "dd642c13-55c2-4b8f-ac8a-d3749dbb9ba6.preview.emergentagent.com",
      "musclemap-fit.preview.emergentagent.com",
    ],
  },
};

export default nextConfig;
