import { strings } from '@/domain/utils';
import { AddForeignKeyConstraintOptions, QueryInterface, Sequelize } from 'sequelize';
import attributes from '@/infrastructure/models/addons/attributes';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable(strings.projectSkill, attributes.projectSkill);

    await queryInterface.addIndex(strings.projectSkill, ['idSkill']);
    await queryInterface.addIndex(strings.projectSkill, ['idProject']);

    await queryInterface.addConstraint(strings.projectSkill, {
      fields: ['idSkill'],
      type: 'foreign key',
      name: 'FK_projectSkill_idSkill',
      references: {
        table: strings.skill,
        field: 'id',
      },
    } as AddForeignKeyConstraintOptions);

    await queryInterface.addConstraint(strings.projectSkill, {
      fields: ['idProject'],
      type: 'foreign key',
      name: 'FK_projectSkill_idProject',
      references: {
        table: strings.project,
        field: 'id',
      },
    } as AddForeignKeyConstraintOptions);
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.removeConstraint(strings.projectSkill, 'FK_projectSkill_idProject');
    await queryInterface.removeConstraint(strings.projectSkill, 'FK_projectSkill_idSkill');

    await queryInterface.removeIndex(strings.projectSkill, ['idSkill']);
    await queryInterface.removeIndex(strings.projectSkill, ['idProject']);

    await queryInterface.dropTable(strings.projectSkill);
  },
};
