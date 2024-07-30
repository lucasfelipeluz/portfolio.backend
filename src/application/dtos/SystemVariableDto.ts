import { SystemVariable } from '@/domain/entities';

class SystemVariableDto {
  public id: number | null;
  public key: string;
  public value: string;
  public createdAt: Date | null;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(systemVariable: SystemVariable) {
    this.id = systemVariable.id;
    this.key = systemVariable.key;
    this.value = systemVariable.value;
    this.createdAt = systemVariable.createdAt;
    this.updatedAt = systemVariable.updatedAt;
    this.deletedAt = systemVariable.deletedAt;
  }
}

export default SystemVariableDto;
