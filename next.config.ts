import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    qualities: [75, 85, 90],
    remotePatterns: [{ protocol: "https", hostname: "static.tvmaze.com", pathname: "/uploads/images/**" }],
  },
};

export default nextConfig;
