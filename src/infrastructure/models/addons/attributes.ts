import { DataTypes, ModelAttributes } from 'sequelize';
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

const project: ModelAttributes<ProjectModel> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  urlWebsite: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  urlGithub: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  viewPriority: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startedAt: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  finishedAt: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(),
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

const skill: ModelAttributes<SkillModel> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  startedAt: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  viewPriority: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(),
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

const projectSkill: ModelAttributes<ProjectSkillModel> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idSkill: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idProject: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(),
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

const projectImage: ModelAttributes<ProjectImageModel> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  path: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  viewPriority: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(),
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  idProject: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

const role: ModelAttributes<RoleModel> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(),
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

const user: ModelAttributes<UserModel> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  nickname: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(120),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(),
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  idRole: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

const aboutMe: ModelAttributes<AboutMeModel> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  jobTitle: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  telegramLink: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  youtubeLink: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  linkedinLink: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  githubLink: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(),
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

const systemVariable: ModelAttributes<SystemVariableModel> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(),
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

export default {
  project,
  skill,
  projectSkill,
  projectImage,
  role,
  user,
  aboutMe,
  systemVariable,
};
