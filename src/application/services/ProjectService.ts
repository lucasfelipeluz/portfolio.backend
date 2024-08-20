import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '@/application/dtos';
import { IProjectService } from '@/application/interfaces';
import { ApplicationError } from '@/core/errors';
import { ServiceFilter, UpdateServiceOptions } from '@/core/types';
import { strings, transform } from '@/core/utils';
import { Project, ProjectSkill } from '@/domain/entities';
import { initTransaction } from '@/infrastructure/config/dbConnection';
import { IProjectRepository, IProjectSkillRepository } from '@/infrastructure/interfaces';
import { ProjectRepository, ProjectSkillRepository } from '@/infrastructure/repositories';
import { injectable } from 'tsyringe';

@injectable()
class ProjectService implements IProjectService {
  private readonly projectRepository: IProjectRepository;
  private readonly projectSkillRepository: IProjectSkillRepository;

  constructor(
    projectRepository: ProjectRepository,
    projectSkillRepository: ProjectSkillRepository,
  ) {
    this.projectRepository = projectRepository;
    this.projectSkillRepository = projectSkillRepository;
  }

  async getAll(filter?: ServiceFilter<ProjectDto>): Promise<ProjectDto[]> {
    const options = transform.serviceFilterToModelFilter<ProjectDto, Project>(
      filter ?? ({} as ServiceFilter<ProjectDto>),
    );

    const entities = await this.projectRepository.getAll(options);

    return entities.map((entity) => new ProjectDto(entity, true));
  }

  async getOne(filter?: ServiceFilter<ProjectDto> | undefined): Promise<ProjectDto | null> {
    const options = transform.serviceFilterToModelFilter<ProjectDto, Project>(
      filter ?? ({} as ServiceFilter<ProjectDto>),
    );

    const entity = await this.projectRepository.getOne(options);

    if (!entity) {
      return {} as ProjectDto;
    }

    return new ProjectDto(entity, true);
  }

  async getById(id: number): Promise<ProjectDto | null> {
    const entity = await this.projectRepository.getById(id);

    if (!entity) {
      return {} as ProjectDto;
    }

    return new ProjectDto(entity, true);
  }

  async create(newEntity: CreateProjectDto): Promise<ProjectDto> {
    const transaction = await initTransaction();
    try {
      const entity = newEntity.toDomain();

      const entityCreated = await this.projectRepository.create(entity, { transaction });

      const idSkills = newEntity.getIdSkills();

      if (idSkills.length > 0) {
        const newProjectSkills = idSkills.map((idSkill) => {
          return {
            idProject: entityCreated.id,
            idSkill: idSkill,
          } as ProjectSkill;
        });

        await this.projectSkillRepository.bulkCreate(newProjectSkills, {
          transaction,
        });
      }

      await transaction.commit();

      return new ProjectDto(entityCreated, false);
    } catch (error) {
      await transaction.rollback();
      throw new ApplicationError(strings.AnErrorOccurredWhileSavingTheData);
    }
  }

  async update(
    newEntity: UpdateProjectDto,
    filter: UpdateServiceOptions<ProjectDto>,
  ): Promise<ProjectDto> {
    const transaction = await initTransaction();
    try {
      const entity = newEntity.toDomain();

      const options = transform.updateServiceFilterToModelUpdateFilter<ProjectDto, Project>(filter);

      const idSkills = newEntity.getIdSkills();

      if (idSkills && idSkills.length > 0) {
        await this.projectSkillRepository.delete({
          where: {
            idProject: entity.id,
          },
          transaction,
        });

        const newProjectSkills = idSkills.map((idSkill) => {
          return {
            idProject: entity.id,
            idSkill: idSkill,
          } as ProjectSkill;
        });

        await this.projectSkillRepository.bulkCreate(newProjectSkills, { transaction });
      }

      await this.projectRepository.update(entity, { ...options, transaction });

      await transaction.commit();

      return new ProjectDto(entity, false);
    } catch (error) {
      await transaction.rollback();
      throw new ApplicationError(strings.AnErrorOccurredWhileSavingTheData);
    }
  }

  async delete(id: number): Promise<boolean> {
    const filter: UpdateServiceOptions<ProjectDto> = {
      where: {
        id: id,
      },
    };

    const options = transform.updateServiceFilterToModelUpdateFilter<ProjectDto, Project>(filter);

    const result = await this.projectRepository.delete(options);

    return result;
  }
}

export default ProjectService;
