"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Estates", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4(),
        primaryKey: true,
        type: Sequelize.UUID,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      from_amount: {
        type: Sequelize.INTEGER,
      },
      to_amount: {
        type: Sequelize.INTEGER,
      },
      property_id: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      cordinates: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      images: {
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
    return queryInterface.dropTable("Estates");
  },
};
