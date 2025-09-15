module.exports = {
    apps: [
        {
            name: 'next-server',
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            // ... other settings
            PORT: 29006
        },
    ],
};
