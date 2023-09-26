'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('j_banks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      j_id: {
        type: Sequelize.INTEGER
      },
      j_username: {
        type: Sequelize.STRING
      },
      j_bank: {
        type: Sequelize.STRING
      },
      j_bank_code: {
        type: Sequelize.STRING
      },
      j_bank_num: {
        type: Sequelize.STRING
      },
      j_account_no: {
        type: Sequelize.STRING
      },
      j_account_name: {
        type: Sequelize.STRING
      },
      j_date: {
        type: Sequelize.DATE
      },
      j_deleted: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('j_banks');
  }
};