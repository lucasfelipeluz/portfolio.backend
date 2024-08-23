module.exports = {
  apps: [
    {
      name: 'backend-TEST',
      script: 'build/index.js',
      instances: 0,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: process.env.NODE_ENV || 'development',
      },
    },
  ],
};
