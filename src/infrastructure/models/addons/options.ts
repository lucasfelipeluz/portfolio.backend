import { InitOptions } from 'sequelize';
import ProjectModel from '../ProjectModel';
import strings from '@/domain/utils/strings';
import dbConnection from '@/infrastructure/config/dbConnection';
import SkillModel from '../SkillModel';

const project: InitOptions<ProjectModel> = {
  tableName: strings.project,
  sequelize: dbConnection,
  paranoid: true,
  timestamps: true,
  createdAt: strings.createdAt,
  updatedAt: strings.updatedAt,
  deletedAt: strings.deletedAt,
};

const skill: InitOptions<SkillModel> = {
  tableName: strings.skill,
  sequelize: dbConnection,
  paranoid: true,
  timestamps: true,
  createdAt: strings.createdAt,
  updatedAt: strings.updatedAt,
  deletedAt: strings.deletedAt,
};

export default {
  project,
  skill,
};
