"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("j_properties_sub_reserves", {
      j_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      j_user_id: {
        type: Sequelize.STRING,
      },
      j_referrer_id: {
        type: Sequelize.DOUBLE,
      },
      j_transact_id: {
        type: Sequelize.STRING,
      },
      j_property_sub_id: {
        type: Sequelize.STRING,
      },
      j_property_id: {
        type: Sequelize.STRING,
      },
      j_qty: {
        type: Sequelize.DOUBLE,
      },
      j_duration: {
        type: Sequelize.DOUBLE,
      },
      j_period: {
        type: Sequelize.STRING,
      },
      j_layers: {
        type: Sequelize.STRING,
      },
      j_name: {
        type: Sequelize.STRING,
      },
      j_gender: {
        type: Sequelize.STRING,
      },
      j_country: {
        type: Sequelize.STRING,
      },
      j_state: {
        type: Sequelize.STRING,
      },
      j_address: {
        type: Sequelize.STRING,
      },
      j_phone: {
        type: Sequelize.STRING,
      },
      j_email: {
        type: Sequelize.STRING,
      },
      j_dob: {
        type: Sequelize.STRING,
      },
      j_occupation: {
        type: Sequelize.STRING,
      },
      j_date: {
        type: Sequelize.DATE,
      },
      j_next_pay_date: {
        type: Sequelize.DATE,
      },
      j_ip: {
        type: Sequelize.STRING,
      },
      j_amount: {
        type: Sequelize.DOUBLE,
      },
      j_interest: {
        type: Sequelize.DOUBLE,
      },
      j_interest_rate: {
        type: Sequelize.DOUBLE,
      },
      j_total: {
        type: Sequelize.DOUBLE,
      },
      j_amount_paid: {
        type: Sequelize.DOUBLE,
      },
      j_paid: {
        type: Sequelize.INTEGER,
      },
      j_deleted: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("j_properties_sub_reserves");
  },
};
