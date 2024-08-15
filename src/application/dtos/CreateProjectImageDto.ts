import { validateProperties } from '@/application/validations';
import { ProjectImage } from '@/domain/entities';
import { ValidationError } from '@/core/errors';

class CreateProjectImageDto {
  private base64: string;
  private viewPriority: number;
  private projectId: number;

  constructor(base64: string, viewPriority: number, projectId: number) {
    this.base64 = base64;
    this.viewPriority = viewPriority;
    this.projectId = projectId;

    this.validate();
  }

  private validate(): void {
    validateProperties<CreateProjectImageDto>(this, ['base64', 'viewPriority', 'projectId']);

    if (this.base64.length < 3) {
      throw new ValidationError('Base64 must be greater than 3 characters');
    }
    if (this.base64.includes('data:image/') === false) {
      throw new ValidationError('Base64 must be an image');
    }
    if (this.viewPriority < 0 || this.viewPriority > 100) {
      throw new ValidationError('View priority must be between 1 and 100');
    }
    if (this.projectId < 1) {
      throw new ValidationError('Project ID must be informed');
    }
  }

  public getBase64(): string {
    return this.base64;
  }

  public toDomain(path: string): ProjectImage {
    return {
      id: 0,
      path: path,
      viewPriority: this.viewPriority,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      idProject: this.projectId,
    } as ProjectImage;
  }
}

export default CreateProjectImageDto;
