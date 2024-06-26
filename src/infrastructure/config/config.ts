import * as dotenv from 'dotenv';
dotenv.config();

const dbUser = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_DATABASE as string;
const dbHost = process.env.DB_HOST;
const dbPort = parseInt(process.env.DB_PORT || '8080', 10);

const config = {
  development: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    dialect: 'mysql',
    logging: true,
  },
  test: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    dialect: 'mysql',
    logging: true,
  },
  production: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    dialect: 'mysql',
    logging: false,
  },
};

export default config;
