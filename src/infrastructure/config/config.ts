import * as dotenv from 'dotenv';
import { ConfigTypes } from '@/infrastructure/types';
dotenv.config();

const dbUser: string = process.env.DB_USERNAME as string;
const dbPassword: string = process.env.DB_PASSWORD as string;
const dbName: string = process.env.DB_DATABASE as string;
const dbHost: string = process.env.DB_HOST as string;
const dbPort: number = parseInt(process.env.DB_PORT || '8080', 10) as number;

const config: ConfigTypes = {
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
