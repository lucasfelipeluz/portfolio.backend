import { AboutMeDto, UpdateAboutMeDto } from '../dtos';

interface IAboutMeService {
  get(): Promise<AboutMeDto>;
  update(aboutMe: UpdateAboutMeDto): Promise<AboutMeDto>;
}

export default IAboutMeService;
