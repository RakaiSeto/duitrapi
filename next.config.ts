import type { NextConfig } from 'next';
import { loadEnvConfig } from '@next/env';
import 'reflect-metadata';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const nextConfig: NextConfig = {
    images: {
        domains: ['placehold.co'],
        unoptimized: true,
    },
    experimental: {
        serverComponentsExternalPackages: ['sequelize', 'pg'],
    },
};

export default nextConfig;