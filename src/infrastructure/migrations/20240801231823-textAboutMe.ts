import { strings } from '@/core/utils';
import { AddForeignKeyConstraintOptions, QueryInterface, Sequelize } from 'sequelize';
import attributes from '@/infrastructure/models/addons/attributes';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.addColumn(strings.aboutMe, strings.text, attributes.aboutMe.text);
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {},
};
