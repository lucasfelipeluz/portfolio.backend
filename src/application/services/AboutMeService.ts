import { ServiceFilter } from '@/core/types';
import { transform } from '@/core/utils';
import { AboutMe } from '@/domain/entities';
import { IAboutMeRepository } from '@/infrastructure/interfaces';
import { AboutMeRepository } from '@/infrastructure/repositories';
import { injectable } from 'tsyringe';
import { AboutMeDto, UpdateAboutMeDto } from '../dtos';
import { IAboutMeService } from '../interfaces';

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
    const filter = {
      order: [{ through: 'createdAt', by: 'DESC' }],
      isActive: true,
      limit: 1,
    } as ServiceFilter<AboutMeDto>;

    const options = transform.updateServiceFilterToModelUpdateFilter<AboutMeDto, AboutMe>(
      filter ?? ({} as ServiceFilter<AboutMeDto>),
    );

    await this.aboutMeRepository.delete(options);

    const entity = await this.aboutMeRepository.create(aboutMe.toDomain());

    return new AboutMeDto(entity);
  }
}

export default AboutMeService;
