import strings from '@/domain/utils/strings';
import { dbConnection } from '@/infrastructure/config/dbConnection';
import { InitOptions } from 'sequelize';
import { ProjectImageModel, ProjectModel, ProjectSkillModel, SkillModel } from '../';

const project: InitOptions<ProjectModel> = {
  tableName: strings.project,
  sequelize: dbConnection,
  timestamps: true,
  createdAt: strings.createdAt,
  updatedAt: strings.updatedAt,
};

const skill: InitOptions<SkillModel> = {
  tableName: strings.skill,
  sequelize: dbConnection,
  timestamps: true,
  createdAt: strings.createdAt,
  updatedAt: strings.updatedAt,
};

const projectSkill: InitOptions<ProjectSkillModel> = {
  tableName: strings.projectSkill,
  sequelize: dbConnection,
  timestamps: true,
  createdAt: strings.createdAt,
  updatedAt: strings.updatedAt,
};

const projectImage: InitOptions<ProjectImageModel> = {
  tableName: strings.projectImage,
  sequelize: dbConnection,
  timestamps: true,
  createdAt: strings.createdAt,
  updatedAt: strings.updatedAt,
};

export default {
  project,
  skill,
  projectSkill,
  projectImage,
};
