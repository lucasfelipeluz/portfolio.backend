import { strings } from '@/core/utils';
import { AddForeignKeyConstraintOptions, DataTypes, QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable(strings.systemVariable, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      key: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      idUser: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    });

    await queryInterface.addIndex(strings.systemVariable, [strings.idUser]);

    await queryInterface.addConstraint(strings.systemVariable, {
      fields: [strings.idUser],
      type: 'foreign key',
      name: strings.FK_systemVariable_idUser,
      references: {
        table: strings.user,
        field: strings.id,
      },
    } as AddForeignKeyConstraintOptions);

    await queryInterface.createTable(strings.aboutMe, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      jobTitle: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      telegramLink: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      youtubeLink: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      linkedinLink: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      githubLink: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.removeConstraint(strings.systemVariable, strings.FK_systemVariable_idUser);

    await queryInterface.removeIndex(strings.systemVariable, [strings.idUser]);

    await queryInterface.dropTable(strings.systemVariable);

    await queryInterface.dropTable(strings.aboutMe);
  },
};
