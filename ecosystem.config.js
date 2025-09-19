module.exports = {
    apps: [
        {
            name: 'duitrapi',
            script: 'node_modules/next/dist/bin/next',
            args: 'start', // ... other settings
            env_production: {
                PORT: 29006, // <-- CORRECT LOCATION
            },
        },
    ],
};
