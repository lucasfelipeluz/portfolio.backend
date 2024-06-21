import strings from '@domain/utils/strings';
import { QueryInterface, Sequelize } from 'sequelize';
import attributes from '../models/addons/attributes';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable(strings.skill, attributes.skill);
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.dropTable(strings.skill);
  },
};
