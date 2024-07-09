import { strings } from '@/domain/utils';
import { AddForeignKeyConstraintOptions, QueryInterface, Sequelize } from 'sequelize';
import attributes from '@/infrastructure/models/addons/attributes';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable(strings.role, attributes.role);

    await queryInterface.createTable(strings.user, attributes.user);

    await queryInterface.addIndex(strings.user, ['idRole']);

    await queryInterface.addConstraint(strings.user, {
      fields: ['idRole'],
      type: 'foreign key',
      name: 'FK_user_idRole',
      references: {
        table: strings.role,
        field: 'id',
      },
    } as AddForeignKeyConstraintOptions);
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.removeConstraint(strings.user, 'FK_user_idRole');

    await queryInterface.removeIndex(strings.user, ['idRole']);

    await queryInterface.dropTable(strings.user);

    await queryInterface.dropTable(strings.role);
  },
};
