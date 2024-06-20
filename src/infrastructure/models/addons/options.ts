import { InitOptions } from 'sequelize';
import ProjectModel from '../ProjectModel';
import strings from '@/domain/utils/strings';
import dbConnection from '@/infrastructure/config/dbConnection';

const project: InitOptions<ProjectModel> = {
  tableName: strings.project,
  sequelize: dbConnection,
  paranoid: true,
  timestamps: true,
};

export default {
  project,
};
