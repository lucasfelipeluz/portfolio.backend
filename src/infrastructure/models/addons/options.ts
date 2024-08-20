import { strings } from '@/core/utils';
import { dbConnection } from '@/infrastructure/config/dbConnection';
import { InitOptions } from 'sequelize';
import {
  AboutMeModel,
  ProjectImageModel,
  ProjectModel,
  ProjectSkillModel,
  RoleModel,
  SkillModel,
  SystemVariableModel,
  UserModel,
} from '../';

function generateDefaultOptions(
  tableName: string,
  isCreatedAt: boolean | true = true,
  isUpdatedAt: boolean | true = true,
): InitOptions {
  return {
    tableName,
    sequelize: dbConnection,
    timestamps: true,
    createdAt: isCreatedAt ? strings.createdAt : false,
    updatedAt: isUpdatedAt ? strings.updatedAt : false,
  };
}

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

const role: InitOptions<RoleModel> = {
  tableName: strings.role,
  sequelize: dbConnection,
  timestamps: true,
  createdAt: strings.createdAt,
  updatedAt: strings.updatedAt,
};

const user: InitOptions<UserModel> = {
  tableName: strings.user,
  sequelize: dbConnection,
  timestamps: true,
  createdAt: strings.createdAt,
  updatedAt: strings.updatedAt,
};

const aboutMe: InitOptions<AboutMeModel> = {
  tableName: strings.aboutMe,
  sequelize: dbConnection,
  timestamps: true,
  createdAt: strings.createdAt,
  updatedAt: strings.updatedAt,
};

const systemVariable: InitOptions<SystemVariableModel> = {
  tableName: strings.systemVariable,
  sequelize: dbConnection,
  timestamps: true,
  createdAt: strings.createdAt,
  updatedAt: strings.updatedAt,
};

export default {
  generateDefaultOptions,
  project,
  skill,
  projectSkill,
  projectImage,
  role,
  user,
  aboutMe,
  systemVariable,
};
