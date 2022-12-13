import { Model, DataTypes } from 'sequelize';
import sequelize from '@src/config/db';
import { Projetos } from '@src/types/Models';

class ProjetosModel extends Model<Projetos> {}

ProjetosModel.init(
  {
    id: { type: DataTypes.NUMBER, allowNull: false, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.STRING, allowNull: false },
    prioridade: { type: DataTypes.NUMBER, allowNull: false },
    url_github: { type: DataTypes.STRING, allowNull: false },
    url_website: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, modelName: 'projetos', createdAt: 'criado_em', updatedAt: 'alterado_em' },
);

export default ProjetosModel;
