import { validateProperties } from '@/application/validations';
import { ProjectImage } from '@/domain/entities';
import { ValidationError } from '@/core/errors';

class CreateProjectImageDto {
  private path: string;
  private viewPriority: number;
  private projectId: number;

  constructor(path: string, viewPriority: number, projectId: number) {
    this.path = path;
    this.viewPriority = viewPriority;
    this.projectId = projectId;

    this.validate();
  }

  private validate(): void {
    validateProperties<CreateProjectImageDto>(this, ['path', 'viewPriority', 'projectId']);

    if (this.path.length < 3 || this.path.length > 255) {
      throw new ValidationError('Path must be between 3 and 255 characters');
    }
    if (this.viewPriority < 0 || this.viewPriority > 100) {
      throw new ValidationError('View priority must be between 1 and 100');
    }
    if (this.projectId < 1) {
      throw new ValidationError('Project ID must be informed');
    }
  }

  public toDomain(): ProjectImage {
    return {
      id: 0,
      path: this.path,
      viewPriority: this.viewPriority,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      idProject: this.projectId,
    } as ProjectImage;
  }
}

export default CreateProjectImageDto;
