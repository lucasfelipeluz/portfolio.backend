import { ServiceFilter } from '@/core/types';
import { AboutMeDto, UpdateAboutMeDto } from '../dtos';

interface IAboutMeService {
  get(filter: ServiceFilter<AboutMeDto>): Promise<AboutMeDto[]>;
  getUsersAboutMe(idUser: string): Promise<AboutMeDto>;
  update(aboutMe: UpdateAboutMeDto): Promise<AboutMeDto>;
}

export default IAboutMeService;
