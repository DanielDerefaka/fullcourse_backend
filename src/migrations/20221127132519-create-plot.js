"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Plots", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      plot_size: {
        type: Sequelize.DOUBLE,
      },
      plot_id: {
        type: Sequelize.STRING,
      },
      property_id: {
        type: Sequelize.STRING,
      },
      cordinates: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
      },
      purchase_order_id: {
        type: Sequelize.STRING,
      },
      customer: {
        type: Sequelize.STRING,
      },
      administrator: {
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
    return queryInterface.dropTable("Plots");
  },
};
