import { strings } from '@/core/utils';
import attributes from '@/infrastructure/models/addons/attributes';
import { QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable(strings.acessMetrics, attributes.acessMetrics);
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.dropTable(strings.acessMetrics);
  },
};
