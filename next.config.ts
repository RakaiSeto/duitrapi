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
    serverExternalPackages: ['pg'],
    webpack: (config) => {
        config.resolve.alias['./locale'] = 'moment/locale';
        return config;
    },
};

export default nextConfig;
