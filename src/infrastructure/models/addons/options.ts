import strings from '@/domain/utils/strings';
import dbConnection from '@/infrastructure/config/dbConnection';
import { InitOptions } from 'sequelize';
import ProjectModel from '../ProjectModel';
import SkillModel from '../SkillModel';
import ProjectSkillModel from '../ProjectSkillModel';

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

export default {
  project,
  skill,
  projectSkill,
};
