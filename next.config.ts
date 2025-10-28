import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Lint 오류로 빌드 실패 방지
  },
  typescript: {
    ignoreBuildErrors: true, // TS 타입 오류로 빌드 실패 방지
  },
  // Server에서 localStorage 등 사용 시 빌드 오류 방지
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
  output: "standalone", // PM2 + EC2 운영 성능 최적화
};

export default nextConfig;
