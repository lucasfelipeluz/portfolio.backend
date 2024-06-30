import strings from '@/domain/utils/strings';
import { Includeable } from 'sequelize';
import ProjectImageModel from '../ProjectImageModel';
import ProjectModel from '../ProjectModel';
import ProjectSkillModel from '../ProjectSkillModel';
import SkillModel from '../SkillModel';

ProjectModel.belongsToMany(SkillModel, {
  through: ProjectSkillModel,
  foreignKey: strings.idProject,
  as: strings.skills,
});

ProjectModel.hasMany(ProjectImageModel, {
  foreignKey: strings.idProject,
  as: strings.images,
});

SkillModel.belongsToMany(ProjectModel, {
  through: ProjectSkillModel,
  foreignKey: strings.idSkill,
  as: strings.projects,
});

const project: Includeable[] = [
  {
    model: SkillModel,
    as: strings.skills,
  },
  {
    model: ProjectImageModel,
    as: strings.images,
  },
];

const skill: Includeable[] = [
  {
    model: ProjectModel,
    as: strings.projects,
  },
];

const projectSkill: Includeable[] = [];

export default {
  project,
  skill,
  projectSkill,
};
