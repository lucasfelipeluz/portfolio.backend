import { strings } from '@/core/utils';
import { AddForeignKeyConstraintOptions, DataTypes, QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable(strings.projectSkill, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idSkill: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idProject: {
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
    });

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
