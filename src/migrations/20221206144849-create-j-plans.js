"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("j_plans", {
      j_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      j_transact_id: {
        type: Sequelize.STRING,
      },
      j_p_id: {
        //this represents the property ID
        type: Sequelize.STRING,
      },
      j_plan: {
        type: Sequelize.STRING,
      },
      j_period: { type: Sequelize.ENUM("Month", "Year") },

      j_interest: {
        type: Sequelize.DOUBLE,
      },
      j_amount_min: {
        type: Sequelize.DOUBLE,
      },
      j_amount_max: {
        type: Sequelize.DOUBLE,
      },
      j_sqm: {
        type: Sequelize.STRING,
      },
      j_pay_s: {
        type: Sequelize.STRING,
      },
      j_duration: {
        type: Sequelize.DOUBLE,
      },
      j_amount: {
        type: Sequelize.DOUBLE,
      },
      j_total_pay: {
        type: Sequelize.DOUBLE,
      },
      j_deleted: {
        type: Sequelize.INTEGER,
      },
      j_date: {
        type: Sequelize.DATE,
      },
      j_ip: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable("j_plans");
  },
};
