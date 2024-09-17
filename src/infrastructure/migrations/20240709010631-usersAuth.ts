import { strings } from '@/core/utils';
import { AddForeignKeyConstraintOptions, DataTypes, QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable(strings.role, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
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
    });

    await queryInterface.createTable(strings.user, {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(300),
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
      idRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });

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
