import { strings } from '@/core/utils';
import { AddForeignKeyConstraintOptions, DataTypes, QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable(strings.projectImage, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      path: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      viewPriority: {
        type: DataTypes.INTEGER,
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
      idProject: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });

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
