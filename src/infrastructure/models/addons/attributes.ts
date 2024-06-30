import { DataTypes, ModelAttributes } from 'sequelize';
import ProjectModel from '../ProjectModel';
import SkillModel from '../SkillModel';
import ProjectSkillModel from '../ProjectSkillModel';
import ProjectImageModel from '../ProjectImageModel';

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
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
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
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
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
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
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
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
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

export default {
  project,
  skill,
  projectSkill,
  projectImage,
};
