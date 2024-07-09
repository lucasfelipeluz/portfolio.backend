import strings from '@/domain/utils/strings';
import { Includeable } from 'sequelize';
import {
  ProjectImageModel,
  ProjectModel,
  ProjectSkillModel,
  RoleModel,
  SkillModel,
  UserModel,
} from '../';

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

UserModel.belongsTo(RoleModel, {
  foreignKey: strings.idRole,
  as: strings.role,
});

RoleModel.hasMany(UserModel, {
  foreignKey: strings.idRole,
  as: strings.users,
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

const user: Includeable[] = [];

const role: Includeable[] = [];

export default {
  project,
  skill,
  projectSkill,
  role,
  user,
};
