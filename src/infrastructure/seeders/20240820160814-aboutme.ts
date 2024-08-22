import { strings } from '@/core/utils';
import { UserRole } from '@/domain/addons';
import { QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkInsert(strings.aboutMe, [
      {
        id: 0,
        name: 'init name',
        text: 'init text',
        jobTitle: 'init jobTitle',
        telegramLink: 'https://telegram.com',
        youtubeLink: 'https://youtube.com',
        linkedinLink: 'https://linkedin.com',
        githubLink: 'https://github.com',
        address: 'init address',
        isAvailable: false,
      },
    ]);
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {},
};
