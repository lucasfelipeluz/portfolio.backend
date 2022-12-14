import { Model, DataTypes } from 'sequelize';
import sequelize from '@src/config/db';
import { ProjetosHabilidades } from '@src/types/Models';
import HabilidadesModel from './HabilidadesModel';
import ProjetosModel from './ProjetosModel';

class ProjetosHabilidadesModel extends Model<ProjetosHabilidades> {}

ProjetosHabilidadesModel.init(
  {
    id: { type: DataTypes.NUMBER, allowNull: false, primaryKey: true, autoIncrement: true },
    id_habilidades: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: HabilidadesModel, key: 'id_pr' },
    },
    id_projetos: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: ProjetosModel, key: 'id_pr' },
    },
  },
  {
    sequelize,
    modelName: 'projetos_habilidades',
    createdAt: false,
    updatedAt: false,
  },
);

export default ProjetosHabilidadesModel;
