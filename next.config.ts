import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["@react-three/drei", "leva"],
  },
}

export default nextConfig
