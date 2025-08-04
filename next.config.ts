import type { NextConfig } from "next";
import { loadEnvConfig } from '@next/env'
 
const projectDir = process.cwd()
loadEnvConfig(projectDir)

const nextConfig: NextConfig = {
  images: {
    domains: ['placehold.co'],
    unoptimized: true,
  },
};

export default nextConfig;
