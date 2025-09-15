module.exports = {
    apps: [
        {
            name: 'next-server',
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            // ... other settings
            env_production: {
                NODE_ENV: 'production',
                PORT: 29006, // <-- Add this line
            },
        },
    ],
};
