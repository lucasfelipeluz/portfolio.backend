module.exports = {
  apps: [
    {
      name: 'backend-instance-1',
      script: 'build/index.js',
      instances: 0,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: process.env.SERVER_MODE || 'development',
      },
    },
    {
      name: 'backend-instance-2',
      script: 'build/index.js',
      instances: 0,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: process.env.SERVER_MODE || 'development',
      },
    },
  ],
};
