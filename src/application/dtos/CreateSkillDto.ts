import { validateProperties } from '@/application/validations';
import { Skill } from '@/domain/entities';
import { ValidationError } from '@/domain/errors';

class CreateSkillDto {
  private title: string;
  private description: string;
  private startedAt: Date;
  private icon: string;
  private color: string;
  private viewPriority: number;

  constructor(
    title: string,
    description: string,
    startedAt: Date,
    icon: string,
    color: string,
    viewPriority: number,
  ) {
    this.title = title;
    this.description = description;
    this.startedAt = startedAt;
    this.icon = icon;
    this.color = color;
    this.viewPriority = viewPriority;

    this.validate();
  }

  private validate(): void {
    validateProperties<CreateSkillDto>(this, [
      'title',
      'description',
      'icon',
      'color',
      'viewPriority',
    ]);

    if (this.title.length < 3 || this.title.length > 120) {
      throw new ValidationError('Name must be between 3 and 120 characters');
    }
    if (this.description.length < 3 || this.description.length > 500) {
      throw new ValidationError('Description must be between 3 and 500 characters');
    }
    if (this.icon.length < 3 || this.icon.length > 50) {
      throw new ValidationError('Icon must be between 3 and 50 characters');
    }
    if (this.color.length < 3 || this.color.length > 10) {
      throw new ValidationError('Color must be between 3 and 10 characters');
    }
    if (this.startedAt > new Date()) {
      throw new ValidationError('Started date must be less than current date');
    }
    if (this.viewPriority < 0 || this.viewPriority > 100) {
      throw new ValidationError('View priority must be between 1 and 100');
    }
  }

  public toDomain(): Skill {
    return new Skill(
      0,
      this.title,
      this.description,
      this.startedAt,
      this.icon,
      this.color,
      this.viewPriority,
      true,
      new Date(),
      null,
      null,
    );
  }
}

export default CreateSkillDto;
