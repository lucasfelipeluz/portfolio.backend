import { CreateSkillDto, SkillDto, UpdateSkillDto } from '@/application/dtos';
import { ISkillService } from '@/application/interfaces';
import { ServiceFilter, UpdateServiceOptions } from '@/core/types';
import { transform } from '@/core/utils';
import { Skill } from '@/domain/entities';
import { SkillRepository } from '@/infrastructure/repositories';
import { injectable } from 'tsyringe';

@injectable()
class SkillService implements ISkillService {
  private readonly skillRepository: SkillRepository;

  constructor(skillRepository: SkillRepository) {
    this.skillRepository = skillRepository;
  }

  async getAll(filter?: ServiceFilter<SkillDto>): Promise<SkillDto[]> {
    const options = transform.serviceFilterToModelFilter<SkillDto, Skill>(
      filter ?? ({} as ServiceFilter<SkillDto>),
    );

    const entities = await this.skillRepository.getAll(options);

    return entities.map((entity) => new SkillDto(entity, true));
  }

  async getOne(filter?: ServiceFilter<SkillDto> | undefined): Promise<SkillDto | null> {
    const options = transform.serviceFilterToModelFilter<SkillDto, Skill>(
      filter ?? ({} as ServiceFilter<SkillDto>),
    );

    const entity = await this.skillRepository.getOne(options);

    return entity ? new SkillDto(entity, true) : ({} as SkillDto);
  }

  async getById(id: number): Promise<SkillDto | null> {
    const entity = await this.skillRepository.getById(id);

    return entity ? new SkillDto(entity, true) : ({} as SkillDto);
  }

  async create(newEntity: CreateSkillDto): Promise<SkillDto> {
    const newEntityDomain = newEntity.toDomain();

    const createdEntity = await this.skillRepository.create(newEntityDomain);

    return new SkillDto(createdEntity);
  }

  async update(entity: UpdateSkillDto, filter: UpdateServiceOptions<SkillDto>): Promise<SkillDto> {
    const newEntity = entity.toDomain();

    const options = transform.updateServiceFilterToModelUpdateFilter<SkillDto, Skill>(filter);

    await this.skillRepository.update(newEntity, options);

    return new SkillDto(newEntity);
  }

  async delete(id: number): Promise<boolean> {
    const filter: ServiceFilter<SkillDto> = {
      where: {
        id: id,
      },
    };

    const options = transform.updateServiceFilterToModelUpdateFilter<SkillDto, Skill>(filter);

    const isDeleted = await this.skillRepository.delete(options);

    return isDeleted;
  }
}

export default SkillService;
