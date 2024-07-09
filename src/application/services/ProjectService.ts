import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '@/application/dtos';
import { IProjectService } from '@/application/interfaces';
import { Project, ProjectSkill } from '@/domain/entities';
import { ApplicationError } from '@/domain/errors';
import { strings } from '@/domain/utils';
import { initTransaction } from '@/infrastructure/config/dbConnection';
import { IProjectRepository, IProjectSkillRepository } from '@/infrastructure/interfaces';
import { ProjectModel } from '@/infrastructure/models';
import { ProjectRepository, ProjectSkillRepository } from '@/infrastructure/repositories';
import { FindOptions, UpdateOptions, WhereOptions } from 'sequelize';
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

  async getAll(filter?: WhereOptions): Promise<ProjectDto[]> {
    const options: FindOptions = {
      where: filter,
    };

    const entities = await this.projectRepository.getAll(options);

    return entities.map((entity) => new ProjectDto(entity, true));
  }

  async getOne(filter?: WhereOptions<ProjectModel> | undefined): Promise<ProjectDto | null> {
    const options: FindOptions = {
      where: filter,
    };

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

  async update(newEntity: UpdateProjectDto, filter: WhereOptions<Project>): Promise<ProjectDto> {
    const entity = newEntity.toDomain();

    const options: UpdateOptions<Project> = {
      where: filter,
    };

    await this.projectRepository.update(entity, options);

    return new ProjectDto(entity, false);
  }

  async delete(id: number): Promise<boolean> {
    const options: UpdateOptions<Project> = {
      where: {
        id: id,
      },
    };

    const result = await this.projectRepository.delete(options);

    return result;
  }
}

export default ProjectService;
