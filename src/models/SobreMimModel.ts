import { Model, DataTypes } from 'sequelize';
import sequelize from '@src/config/db';
import { SobreMim } from '@src/types/Models';

class SobreMimModel extends Model<SobreMim> {}

SobreMimModel.init(
  {
    id: { type: DataTypes.NUMBER, allowNull: false, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    texto: { type: DataTypes.STRING, allowNull: false },
    titulo_emprego: { type: DataTypes.STRING, allowNull: false },
    link_github: { type: DataTypes.STRING, allowNull: false },
    link_instagram: { type: DataTypes.STRING, allowNull: false },
    link_linkedin: { type: DataTypes.STRING, allowNull: false },
    link_telegram: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'sobremim', tableName: 'sobremim', createdAt: false, updatedAt: false },
);

export default SobreMimModel;
