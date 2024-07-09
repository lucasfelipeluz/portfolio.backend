import { ExecutionType } from '@/domain/types';
import config from '@/infrastructure/config/config';
import { Sequelize, Transaction } from 'sequelize';

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

const initTransaction = async (): Promise<Transaction> => {
  return await dbConnection.transaction();
};

export { initTransaction, dbConnection };
