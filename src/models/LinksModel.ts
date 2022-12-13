import { Model, DataTypes } from 'sequelize';
import sequelize from '@src/config/db';
import { Links } from '@src/types/Models';

class LinksModel extends Model<Links> {}

LinksModel.init(
  {
    id: { type: DataTypes.NUMBER, allowNull: false, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'projetos', createdAt: false, updatedAt: false },
);

export default LinksModel;
