import { DataTypes, ModelAttributes } from 'sequelize';
import ProjectModel from '../ProjectModel';

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

export default {
  project,
};
