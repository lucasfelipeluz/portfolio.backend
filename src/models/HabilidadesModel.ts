import { Model, DataTypes } from 'sequelize';
import sequelize from '@src/config/db';
import { Habilidades } from '@src/types/Models';

class HabilidadesModel extends Model<Habilidades> {}

HabilidadesModel.init(
  {
    id: { type: DataTypes.NUMBER, allowNull: false, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.STRING, allowNull: false },
    experiencia: { type: DataTypes.INTEGER, allowNull: false },
    prioridade: { type: DataTypes.INTEGER, allowNull: false },
    cores: { type: DataTypes.STRING, allowNull: false },
    icones: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'habilidades', createdAt: 'criado_em', updatedAt: 'alterado_em' },
);

export default HabilidadesModel;
