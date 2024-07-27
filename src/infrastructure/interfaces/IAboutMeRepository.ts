import { AboutMe } from '@/domain/entities';
import IBaseRepository from './IBaseRepository';

interface IAboutMeRepository extends IBaseRepository<AboutMe> {}

export default IAboutMeRepository;
