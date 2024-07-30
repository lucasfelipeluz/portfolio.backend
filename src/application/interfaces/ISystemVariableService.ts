import { ServiceFilter } from '@/core/types';
import { CreateSystemVariableDto, SystemVariableDto } from '../dtos';

interface ISystemVariableService {
  getAll(filter?: ServiceFilter<SystemVariableDto>): Promise<SystemVariableDto[]>;
  get(key?: string): Promise<SystemVariableDto | null>;
  createOrUpdate(entity: CreateSystemVariableDto): Promise<SystemVariableDto>;
  delete(id: number): Promise<boolean>;
}

export default ISystemVariableService;
