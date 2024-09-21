import { ServiceFilter } from '@/core/types';
import { CreateSystemVariableDto, SystemVariableDto } from '../dtos';

interface ISystemVariableService {
  getAll(filter?: ServiceFilter<SystemVariableDto>): Promise<SystemVariableDto[]>;
  get(key: string, idUser: string): Promise<SystemVariableDto | null>;
  createOrUpdate(entity: CreateSystemVariableDto): Promise<SystemVariableDto>;
  delete(id: number, idUser: string): Promise<boolean>;
}

export default ISystemVariableService;
