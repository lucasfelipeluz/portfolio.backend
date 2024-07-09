import { CreateSkillDto, SkillDto, UpdateSkillDto } from '@/application/dtos';
import { ISkillService } from '@/application/interfaces';
import { SkillModel } from '@/infrastructure/models';
import { SkillRepository } from '@/infrastructure/repositories';
import { FindOptions, UpdateOptions, WhereOptions } from 'sequelize';
import { injectable } from 'tsyringe';

@injectable()
class SkillService implements ISkillService {
  private readonly skillRepository: SkillRepository;

  constructor(skillRepository: SkillRepository) {
    this.skillRepository = skillRepository;
  }

  async getAll(filter?: WhereOptions): Promise<SkillDto[]> {
    const options: FindOptions = {
      where: filter,
    };

    const entities = await this.skillRepository.getAll(options);

    return entities.map((entity) => new SkillDto(entity, true));
  }

  async getOne(filter?: WhereOptions<SkillModel> | undefined): Promise<SkillDto | null> {
    const options: FindOptions = {
      where: filter,
    };

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

  async update(entity: UpdateSkillDto, filter: WhereOptions<SkillModel>): Promise<SkillDto> {
    const newEntity = entity.toDomain();

    const options: UpdateOptions<SkillModel> = {
      where: filter,
    };

    await this.skillRepository.update(newEntity, options);

    return new SkillDto(newEntity);
  }

  async delete(id: number): Promise<boolean> {
    const options: UpdateOptions<SkillModel> = {
      where: {
        id: id,
      },
    };

    const isDeleted = await this.skillRepository.delete(options);

    return isDeleted;
  }
}

export default SkillService;
