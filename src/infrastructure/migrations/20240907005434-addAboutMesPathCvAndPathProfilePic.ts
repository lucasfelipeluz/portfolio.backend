import { strings } from '@/core/utils';
import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.addColumn(strings.aboutMe, strings.pathCv, {
      type: DataTypes.STRING(255),
      allowNull: true,
    });

    await queryInterface.addColumn(strings.aboutMe, strings.pathProfilePic, {
      type: DataTypes.STRING(255),
      allowNull: true,
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.removeColumn(strings.aboutMe, strings.pathCv);
    await queryInterface.removeColumn(strings.aboutMe, strings.pathProfilePic);
  },
};
