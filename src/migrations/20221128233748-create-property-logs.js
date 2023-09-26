"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("PropertyLogs", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      property: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE", "SOLD", "DELETED"),
        defaultValue: "ACTIVE",
      },
      amount_paid: {
        type: Sequelize.INTEGER,
      },
      property_price: {
        type: Sequelize.INTEGER,
      },
      purchase_date: {
        type: Sequelize.STRING,
      },
      buyer: {
        type: Sequelize.STRING,
      },
      cordinates: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      client: {
        type: Sequelize.STRING,
      },
      reference_id: {
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
    return queryInterface.dropTable("PropertyLogs");
  },
};
