import { strings } from '@/core/utils';
import { QueryInterface, Sequelize } from 'sequelize';
import attributes from '@/infrastructure/models/addons/attributes';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable(strings.systemVariable, attributes.systemVariable);

    await queryInterface.createTable(strings.aboutMe, attributes.aboutMe);
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.dropTable(strings.systemVariable);

    await queryInterface.dropTable(strings.aboutMe);
  },
};
