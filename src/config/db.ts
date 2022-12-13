import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();
const {
  db_host: dbHost,
  db_user: dbUser,
  db_password: dbPassword,
  db_database: dbDatabase,
} = process.env;

export default new Sequelize(dbDatabase!, dbUser!, dbPassword!, {
  dialect: 'mysql',
  host: dbHost!,
});
