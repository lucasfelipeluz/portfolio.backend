import { ServiceFilter } from '@/core/types';
import { strings, transform } from '@/core/utils';
import { AboutMe } from '@/domain/entities';
import { IAboutMeRepository } from '@/infrastructure/interfaces';
import { AboutMeRepository } from '@/infrastructure/repositories';
import { injectable } from 'tsyringe';
import { AboutMeDto, UpdateAboutMeDto } from '../dtos';
import { IAboutMeService } from '../interfaces';
import { ApplicationError, NotFoundEntityError } from '@/core/errors';
import { initTransaction } from '@/infrastructure/config/dbConnection';

@injectable()
class AboutMeService implements IAboutMeService {
  private readonly aboutMeRepository: IAboutMeRepository;

  constructor(aboutMeRepository: AboutMeRepository) {
    this.aboutMeRepository = aboutMeRepository;
  }

  async get(): Promise<AboutMeDto> {
    const filter = {
      order: [{ through: 'createdAt', by: 'DESC' }],
      isActive: true,
      limit: 1,
    } as ServiceFilter<AboutMeDto>;

    const options = transform.serviceFilterToModelFilter<AboutMeDto, AboutMe>(
      filter ?? ({} as ServiceFilter<AboutMeDto>),
    );

    const entity = await this.aboutMeRepository.getOne(options);

    if (!entity) {
      return {} as AboutMeDto;
    }

    return new AboutMeDto(entity);
  }

  async update(aboutMe: UpdateAboutMeDto): Promise<AboutMeDto> {
    const transaction = await initTransaction();

    try {
      const filter = {
        order: [{ through: 'createdAt', by: 'DESC' }],
        isActive: true,
        limit: 1,
      } as ServiceFilter<AboutMeDto>;

      const options = transform.updateServiceFilterToModelUpdateFilter<AboutMeDto, AboutMe>(
        filter ?? ({} as ServiceFilter<AboutMeDto>),
      );

      const oldEntity = await this.aboutMeRepository.getOne(options);

      if (!oldEntity) {
        throw new NotFoundEntityError(strings.aboutMeNotFound);
      }

      await this.aboutMeRepository.delete({ ...options, transaction });

      const newEntity = aboutMe.toUpdateEntity(oldEntity);

      const entity = await this.aboutMeRepository.create(newEntity, {
        transaction,
      });

      await transaction.commit();

      return new AboutMeDto(entity);
    } catch (error) {
      await transaction.rollback();
      throw new ApplicationError(strings.AnErrorOccurredWhileSavingTheData);
    }
  }
}

export default AboutMeService;
