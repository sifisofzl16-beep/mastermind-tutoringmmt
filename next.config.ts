import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/tutors",
        destination: "https://tutorflow-mmt-murex.vercel.app/tutor",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;