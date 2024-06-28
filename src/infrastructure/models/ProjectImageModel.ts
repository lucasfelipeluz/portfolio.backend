import ProjectImage from '@/domain/entities/ProjectImage';
import { Model } from 'sequelize';
import attributes from './addons/attributes';
import options from './addons/options';

class ProjectImageModel extends Model<ProjectImage> {
  declare id: number;
  declare path: string;
  declare viewPriority: number;

  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date | null;
  declare deletedAt: Date | null;

  declare idProject: number;

  declare project: ProjectImage | null;
}

ProjectImageModel.init(attributes.projectImage, options.projectImage);

export default ProjectImageModel;
