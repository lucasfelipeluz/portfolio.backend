import { ExecutionType } from '@/infrastructure/types';
import config from '@/infrastructure/config/config';
import { Sequelize, Transaction } from 'sequelize';

const env: ExecutionType = (process.env.NODE_ENV as ExecutionType) || 'development';

const dbConnection: Sequelize = new Sequelize(
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

function initTransaction(): Promise<Transaction> {
  return dbConnection.transaction();
}

export { initTransaction, dbConnection };
