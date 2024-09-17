import { strings } from '@/core/utils';
import { AddForeignKeyConstraintOptions, DataTypes, QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.addColumn(strings.user, strings.idAboutMe, {
      type: DataTypes.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn(strings.user, strings.number, {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addIndex(strings.user, [strings.idAboutMe]);

    await queryInterface.addConstraint(strings.user, {
      fields: [strings.idAboutMe],
      type: 'foreign key',
      name: strings.FK_user_idAboutMe,
      references: {
        table: strings.aboutMe,
        field: strings.id,
      },
    } as AddForeignKeyConstraintOptions);
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.removeConstraint(strings.user, strings.FK_user_idAboutMe);

    await queryInterface.removeIndex(strings.user, [strings.idAboutMe]);

    await queryInterface.removeColumn(strings.user, strings.idAboutMe);
    await queryInterface.removeColumn(strings.user, strings.number);
  },
};
