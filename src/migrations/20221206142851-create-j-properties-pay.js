'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('j_properties_pays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      j_id: {
        type: Sequelize.INTEGER
      },
      j_user_id: {
        type: Sequelize.STRING
      },
      j_transact_id: {
        type: Sequelize.STRING
      },
      j_property_sub_id: {
        type: Sequelize.STRING
      },
      j_property_id: {
        type: Sequelize.STRING
      },
      j_reserve_id: {
        type: Sequelize.STRING
      },
      j_layers: {
        type: Sequelize.STRING
      },
      j_currency: {
        type: Sequelize.STRING
      },
      j_amount: {
        type: Sequelize.DOUBLE
      },
      j_date: {
        type: Sequelize.DATE
      },
      j_paid: {
        type: Sequelize.INTEGER
      },
      j_end_date: {
        type: Sequelize.DATE
      },
      j_ip: {
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
    return queryInterface.dropTable('j_properties_pays');
  }
};