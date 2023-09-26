"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("j_properties_subs", {
      j_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      j_user_id: {
        type: Sequelize.STRING,
      },
      j_transact_id: {
        type: Sequelize.STRING,
      },
      j_property_id: {
        type: Sequelize.STRING,
      },
      j_type: {
        type: Sequelize.STRING,
      },
      j_title: {
        type: Sequelize.STRING,
      },
      j_amount: {
        type: Sequelize.DOUBLE,
      },
      j_amount_old: {
        type: Sequelize.DOUBLE,
      },
      j_period: {
        type: Sequelize.STRING,
      },
      j_qty: {
        type: Sequelize.DOUBLE,
      },
      j_p_no: {
        type: Sequelize.STRING,
      },
      j_desc: {
        type: Sequelize.STRING,
      },
      j_country: {
        type: Sequelize.STRING,
      },
      j_state: {
        type: Sequelize.STRING,
      },
      j_city: {
        type: Sequelize.STRING,
      },
      j_address: {
        type: Sequelize.STRING,
      },
      j_img: {
        type: Sequelize.STRING,
      },
      j_date: {
        type: Sequelize.DATE,
      },
      j_ip: {
        type: Sequelize.STRING,
      },
      j_status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      j_admin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      j_deleted: { type: Sequelize.INTEGER, defaultValue: 0 },

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
    return queryInterface.dropTable("j_properties_subs");
  },
};
