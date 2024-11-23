import {
  ApplicationEntityCreatingOptions,
  ApplicationEntityDeletingOptions,
  ApplicationEntityUpdatingOptions,
  ApplicationFilter,
} from '@/core/types';
import { strings, transform } from '@/core/utils';
import { ProjectImage } from '@/domain/entities';
import {
  IBaseRepository,
  ICacheProvider,
  IProjectImageRepository,
} from '@/infrastructure/interfaces';
import { ProjectImageModel } from '@/infrastructure/models';
import relationships from '@/infrastructure/models/addons/relationships';
import { CacheProvider } from '@/infrastructure/providers';
import { injectable } from 'tsyringe';

@injectable()
class ProjectImageRepository implements IBaseRepository<ProjectImage>, IProjectImageRepository {
  private readonly cacheProvider: ICacheProvider<ProjectImage>;

  constructor(cacheProvider: CacheProvider<ProjectImage>) {
    this.cacheProvider = cacheProvider;
  }

  async getAll(options: ApplicationFilter<ProjectImage>): Promise<ProjectImage[]> {
    const cache = await this.cacheProvider.get(strings.projectImages, options);

    if (cache) {
      return cache as ProjectImage[];
    }

    const findOptions = transform.applicationFilterToFindOptions(options);

    const result = await ProjectImageModel.findAll({
      ...findOptions,
      include: relationships.project,
    });

    if (result.length < 1) {
      return [] as ProjectImage[];
    }

    await this.cacheProvider.create(strings.projects, options, result);

    return result as ProjectImage[];
  }

  async getOne(options: ApplicationFilter<ProjectImage>): Promise<ProjectImage | null> {
    const cache = await this.cacheProvider.get(strings.projectImages, options);

    if (cache) {
      return cache as ProjectImage;
    }

    const findOptions = transform.applicationFilterToFindOptions(options);

    const result = await ProjectImageModel.findOne({
      ...findOptions,
      include: relationships.project,
    });

    if (result) {
      await this.cacheProvider.create(strings.projectImages, options, result);
    }

    return result as ProjectImage;
  }

  async create(
    entity: ProjectImage,
    options: ApplicationEntityCreatingOptions,
  ): Promise<ProjectImage> {
    const createOptions = transform.applicationCreatingOptionsToCreateOptions(options);

    const result = await ProjectImageModel.create(entity, createOptions);

    await this.cacheProvider.clearWhenStartingWithThese([strings.projects, strings.projectImages]);

    return result as ProjectImage;
  }

  async update(
    entity: ProjectImage,
    options: ApplicationEntityUpdatingOptions<ProjectImage>,
  ): Promise<boolean> {
    const updateOptions = transform.applicationDeletingOptionsToUpdateOptions(options);

    const result = await ProjectImageModel.update(entity, updateOptions);

    if (result[0] < 1) {
      return false;
    }

    await this.cacheProvider.clearWhenStartingWithThese([strings.projects, strings.projectImages]);

    return true;
  }

  async delete(options: ApplicationEntityDeletingOptions<ProjectImage>): Promise<boolean> {
    const updateOptions = transform.applicationDeletingOptionsToUpdateOptions(options);

    const result = await ProjectImageModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      updateOptions,
    );

    if (result[0] > 0) {
      await this.cacheProvider.clearWhenStartingWithThese([
        strings.projects,
        strings.projectImages,
      ]);

      return true;
    }

    return false;
  }
}

export default ProjectImageRepository;
