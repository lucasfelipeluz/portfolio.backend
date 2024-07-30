import { SystemVariable } from '@/domain/entities';
import IBaseRepository from './IBaseRepository';

interface ISystemVariableRepository extends IBaseRepository<SystemVariable> {}

export default ISystemVariableRepository;
