import { strings } from '@/domain/utils';
import { AddForeignKeyConstraintOptions, QueryInterface, Sequelize } from 'sequelize';
import { attributes } from '@/infrastructure/models/addons';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable(strings.projectImage, attributes.projectImage);

    await queryInterface.addIndex(strings.projectImage, ['idProject']);

    await queryInterface.addConstraint(strings.projectImage, {
      fields: ['idProject'],
      type: 'foreign key',
      name: 'FK_projectImage_idProject',
      references: {
        table: strings.project,
        field: 'id',
      },
    } as AddForeignKeyConstraintOptions);
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.removeConstraint(strings.projectImage, 'FK_projectImage_idProject');

    await queryInterface.removeIndex(strings.projectImage, ['idProject']);

    await queryInterface.dropTable(strings.projectImage);
  },
};