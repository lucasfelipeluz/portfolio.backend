import { ProjectImage } from '@/domain/entities';
import IBaseRepository from '@/infrastructure/interfaces/IBaseRepository';

interface IProjectImageRepository extends IBaseRepository<ProjectImage> {}

export default IProjectImageRepository;
