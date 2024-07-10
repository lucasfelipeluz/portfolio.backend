import { strings } from '@/core/utils';
import { UserRole } from '@/domain/addons';
import { QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkInsert(strings.role, [
      {
        id: UserRole.Admin,
        name: 'admin',
      },
      {
        id: UserRole.User,
        name: 'user',
      },
      {
        id: UserRole.Guest,
        name: 'guest',
      },
    ]);
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkDelete(strings.role, {
      id: [1, 2, 3],
    });
  },
};
