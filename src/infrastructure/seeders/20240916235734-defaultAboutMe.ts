import { strings } from '@/core/utils';
import { UserRole } from '@/domain/addons';
import { QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkInsert(strings.aboutMe, [
      {
        id: 1,
        name: 'John Doe',
        text: 'I am a great person',
        jobTitle: 'Front End Developer',
        telegramLink: 'https://t.me/johndoe',
        youtubeLink: 'https://www.youtube.com/johndoe',
        linkedinLink: 'https://www.linkedin.com/in/johndoe',
        githubLink: 'https://github.com/jonhdoe',
        address: '1234 Main St',
        pathCv: null,
        pathProfilePic: null,
        isAvailable: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {},
};
