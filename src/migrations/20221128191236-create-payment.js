"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4(),
        type: Sequelize.UUID,
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM(
          "TOP-UP",
          "INVESTMENT",
          "PROPERTY-BUY",
          "MATERIAL",
          "HOUSING"
        ),
      },
      kind: {
        type: Sequelize.ENUM("CREDIT", "DEBIT"),
      },
      amount: {
        type: Sequelize.DOUBLE,
      },
      description: {
        type: Sequelize.STRING,
      },
      reference_id: {
        type: Sequelize.STRING,
      },
      payment_method: {
        type: Sequelize.STRING,
      },
      user_id: {
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
    return queryInterface.dropTable("Payments");
  },
};
