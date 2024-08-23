module.exports = {
  apps: [
    {
      name: 'backend-0',
      script: 'npm',
      args: 'run start:force',
      autorestart: true,
      watch: false,
      instance: 1,
      env: {
        NODE_ENV: process.env.SERVER_MODE || 'development',
        PORT_SERVER: 8000,
      },
      post_update: ['echo 2'],
    },
    {
      name: 'backend-1',
      script: 'npm',
      args: 'run start:force',
      autorestart: true,
      watch: false,
      instance: 1,
      env: {
        NODE_ENV: process.env.SERVER_MODE || 'development',
        PORT_SERVER: 8001,
      },
    },
  ],
};
