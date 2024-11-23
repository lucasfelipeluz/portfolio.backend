import {
  ApplicationEntityCreatingOptions,
  ApplicationEntityDeletingOptions,
  ApplicationEntityUpdatingOptions,
  ApplicationFilter,
} from '@/core/types';
import { strings, transform } from '@/core/utils';
import { Project } from '@/domain/entities';
import { IBaseRepository, ICacheProvider, IProjectRepository } from '@/infrastructure/interfaces';
import { ProjectModel } from '@/infrastructure/models';
import relationships from '@/infrastructure/models/addons/relationships';
import { CacheProvider } from '@/infrastructure/providers';
import { injectable } from 'tsyringe';

@injectable()
class ProjectRepository implements IBaseRepository<Project>, IProjectRepository {
  private readonly cacheProvider: ICacheProvider<Project>;

  constructor(cacheProvider: CacheProvider<Project>) {
    this.cacheProvider = cacheProvider;
  }

  async getAll(options: ApplicationFilter<Project>): Promise<Project[]> {
    const cache = await this.cacheProvider.get(strings.projects, options);

    if (cache) {
      return cache as Project[];
    }

    const findOptions = transform.applicationFilterToFindOptions(options);

    const result = await ProjectModel.findAll({ ...findOptions, include: relationships.project });

    if (result.length < 1) {
      return [] as Project[];
    }

    await this.cacheProvider.create(strings.projects, options, result);

    return result as Project[];
  }

  async getOne(options: ApplicationFilter<Project>): Promise<Project | null> {
    const cache = await this.cacheProvider.get(strings.projects, options);

    if (cache) {
      return cache as Project;
    }

    const findOptions = transform.applicationFilterToFindOptions(options);

    const result = await ProjectModel.findOne({ ...findOptions, include: relationships.project });

    if (result) {
      await this.cacheProvider.create(strings.projects, options, result);
    }

    return result as Project;
  }

  async create(entity: Project, options: ApplicationEntityCreatingOptions): Promise<Project> {
    const createOptions = transform.applicationCreatingOptionsToCreateOptions(options);

    const result = await ProjectModel.create(entity, createOptions);

    await this.cacheProvider.clearWhenStartingWithThese([
      strings.projects,
      strings.skills,
      strings.projectImages,
      strings.projectSkill,
    ]);

    return result as Project;
  }

  async update(
    entity: Project,
    options: ApplicationEntityUpdatingOptions<Project>,
  ): Promise<boolean> {
    const updateOptions = transform.applicationUpdatingOptionsToUpdateOptions(options);

    const result = await ProjectModel.update(entity, updateOptions);

    if (result[0] < 1) {
      return false;
    }

    await this.cacheProvider.clearWhenStartingWithThese([
      strings.projects,
      strings.skills,
      strings.projectImages,
      strings.projectSkill,
    ]);

    return true;
  }

  async delete(options: ApplicationEntityDeletingOptions<Project>): Promise<boolean> {
    const updateOptions = transform.applicationDeletingOptionsToUpdateOptions<Project>(options);

    const result = await ProjectModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      updateOptions,
    );

    if (result[0] > 0) {
      await this.cacheProvider.clearWhenStartingWithThese([
        strings.projects,
        strings.skills,
        strings.projectImages,
        strings.projectSkill,
      ]);

      return true;
    }

    return false;
  }
}

export default ProjectRepository;
