import { strings } from '@/domain/utils';
import { AddForeignKeyConstraintOptions, QueryInterface, Sequelize } from 'sequelize';
import { attributes } from '@/infrastructure/models/addons';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable(strings.skill, attributes.skill);
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.dropTable(strings.skill);
  },
};
