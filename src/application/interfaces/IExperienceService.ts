import { CreateExperienceDto, ExperienceDto, UpdateExperienceDto } from '@/application/dtos';
import { ServiceFilter, UpdateServiceOptions } from '@/core/types';

interface IExperienceService {
  getAll(filter: ServiceFilter<ExperienceDto>): Promise<ExperienceDto[]>;
  getOne(filter: ServiceFilter<ExperienceDto>): Promise<ExperienceDto | null>;
  getById(id: number): Promise<ExperienceDto | null>;
  create(entity: CreateExperienceDto): Promise<ExperienceDto>;
  update(
    entity: UpdateExperienceDto,
    filter: UpdateServiceOptions<ExperienceDto>,
  ): Promise<ExperienceDto>;
  delete(id: number): Promise<boolean>;
}

export default IExperienceService;
