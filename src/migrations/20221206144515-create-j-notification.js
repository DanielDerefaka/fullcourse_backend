'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('j_notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      j_id: {
        type: Sequelize.INTEGER
      },
      j_group_id: {
        type: Sequelize.STRING
      },
      j_user_id: {
        type: Sequelize.STRING
      },
      j_subject: {
        type: Sequelize.STRING
      },
      j_message: {
        type: Sequelize.STRING
      },
      j_date: {
        type: Sequelize.DATE
      },
      j_read: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('j_notifications');
  }
};