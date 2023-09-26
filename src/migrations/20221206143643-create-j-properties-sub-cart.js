'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('j_properties_sub_carts', {
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
      j_p_no: {
        type: Sequelize.STRING
      },
      j_title: {
        type: Sequelize.STRING
      },
      j_qty: {
        type: Sequelize.DOUBLE
      },
      j_currency: {
        type: Sequelize.STRING
      },
      j_amount: {
        type: Sequelize.DOUBLE
      },
      j_total: {
        type: Sequelize.DOUBLE
      },
      j_date: {
        type: Sequelize.DATE
      },
      j_ip: {
        type: Sequelize.STRING
      },
      j_status: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('j_properties_sub_carts');
  }
};