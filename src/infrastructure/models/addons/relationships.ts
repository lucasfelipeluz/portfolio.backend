import strings from '@/domain/utils/strings';
import { Includeable } from 'sequelize';
import ProjectModel from '../ProjectModel';
import SkillModel from '../SkillModel';
import ProjectSkillModel from '../ProjectSkillModel';

ProjectModel.belongsToMany(SkillModel, {
  through: ProjectSkillModel,
  foreignKey: strings.idProject,
  as: strings.skills,
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
