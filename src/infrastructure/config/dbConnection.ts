import { ExecutionType } from '@domain/types/environmentVariable';
import { Sequelize } from 'sequelize';
import config from './config';

const env: ExecutionType = (process.env.NODE_ENV as ExecutionType) || 'development';

const dbConnection = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password!,
  {
    host: config[env].host,
    port: config[env].port,
    dialect: 'mysql',
    timezone: '-03:00',
  },
);

export default dbConnection;
