import { ApplicationError, NotFoundEntityError } from '@/core/errors';
import { CreateStorageItem, ServiceFilter, StorageItem } from '@/core/types';
import { strings, transform } from '@/core/utils';
import { AboutMe, User } from '@/domain/entities';
import { initTransaction } from '@/infrastructure/config/dbConnection';
import { IAboutMeRepository, IStorageProvider, IUserRepository } from '@/infrastructure/interfaces';
import { StorageProvider } from '@/infrastructure/providers';
import { AboutMeRepository, UserRepository } from '@/infrastructure/repositories';
import { injectable } from 'tsyringe';
import { v4 as generateUuidV4 } from 'uuid';
import { AboutMeDto, UpdateAboutMeDto } from '../dtos';
import { IAboutMeService } from '../interfaces';

@injectable()
class AboutMeService implements IAboutMeService {
  private readonly aboutMeRepository: IAboutMeRepository;
  private readonly userRepository: IUserRepository;
  private readonly storageProvider: IStorageProvider;

  constructor(
    aboutMeRepository: AboutMeRepository,
    userRepository: UserRepository,
    storageProvider: StorageProvider,
  ) {
    this.aboutMeRepository = aboutMeRepository;
    this.userRepository = userRepository;
    this.storageProvider = storageProvider;
  }

  private async saveImagesToStorage(
    base64Cv?: string,
    base64ProfilePic?: string,
  ): Promise<{ cv: StorageItem | null; profile: StorageItem | null; isSuccess: boolean }> {
    try {
      let cv: StorageItem | null = null;
      let profile: StorageItem | null = null;

      if (base64Cv) {
        const createCvStorageItem: CreateStorageItem = {
          base64: base64Cv,
          filename: generateUuidV4(),
          folder: strings.cv,
          extension: strings.applicationPdf,
        };

        cv = await this.storageProvider.create(createCvStorageItem);
      }

      if (base64ProfilePic) {
        const createProfileStorageItem: CreateStorageItem = {
          base64: base64ProfilePic,
          filename: generateUuidV4(),
          folder: strings.profile,
        };

        profile = await this.storageProvider.create(createProfileStorageItem);
      }

      return { isSuccess: true, cv, profile };
    } catch (e) {
      return { isSuccess: false, cv: null, profile: null };
    }
  }

  async get(filter: ServiceFilter<AboutMeDto>): Promise<AboutMeDto[]> {
    const options = transform.serviceFilterToModelFilter<AboutMeDto, AboutMe>(
      filter ?? ({} as ServiceFilter<AboutMeDto>),
    );

    const entities = await this.aboutMeRepository.getAll(options);

    return entities.map((entity) => new AboutMeDto(entity));
  }

  async getUsersAboutMe(idUser: string): Promise<AboutMeDto> {
    const filter = {
      where: {
        '$user.id$': idUser,
      },
      order: [{ through: 'createdAt', by: 'DESC' }],
      isActive: true,
      limit: 1,
    } as ServiceFilter<AboutMeDto>;

    const options = transform.serviceFilterToModelFilter<AboutMeDto, AboutMe>(
      filter ?? ({} as ServiceFilter<AboutMeDto>),
    );

    const entity = await this.aboutMeRepository.getOne(options);

    if (!entity) {
      throw new NotFoundEntityError(strings.aboutMeNotFound);
    }

    return new AboutMeDto(entity);
  }

  async update(aboutMe: UpdateAboutMeDto): Promise<AboutMeDto> {
    const transaction = await initTransaction();

    try {
      const filter = {
        where: {
          '$user.id$': aboutMe.getIdUser(),
        },
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

      // Handle the base64 files
      const base64 = aboutMe.getBase64Files();

      const { cv, isSuccess, profile } = await this.saveImagesToStorage(
        base64.base64Cv,
        base64.base64ProfilePic,
      );
      if (!isSuccess) {
        throw new ApplicationError(strings.AnErrorOccurredWhileSavingTheData);
      }
      aboutMe.setPathsImages(cv?.key, profile?.key);

      // Handle the entity
      const deleteFilter = {
        where: {
          id: oldEntity.id,
        },
        order: [{ through: 'createdAt', by: 'DESC' }],
        isActive: true,
        limit: 1,
      } as ServiceFilter<AboutMeDto>;

      const deleteOptions = transform.updateServiceFilterToModelUpdateFilter<AboutMeDto, AboutMe>(
        deleteFilter ?? ({} as ServiceFilter<AboutMeDto>),
      );

      await this.aboutMeRepository.delete({ ...deleteOptions, transaction });

      const newEntity = aboutMe.toUpdateEntity(oldEntity);

      const entity = await this.aboutMeRepository.create(newEntity, {
        transaction,
      });

      await this.userRepository.update(
        {
          idAboutMe: entity.id,
        } as User,
        {
          where: {
            id: aboutMe.getIdUser(),
          },
          transaction,
        },
      );

      await transaction.commit();

      return new AboutMeDto(entity);
    } catch (error) {
      await transaction.rollback();
      throw new ApplicationError(strings.AnErrorOccurredWhileSavingTheData);
    }
  }
}

export default AboutMeService;
