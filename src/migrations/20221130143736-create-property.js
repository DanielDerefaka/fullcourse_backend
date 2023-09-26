"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Properties", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4(),
      },
      name: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      coordinates: {
        type: Sequelize.STRING,
      },
      views: {
        type: Sequelize.INTEGER,
      },
      property_address: {
        type: Sequelize.STRING,
      },
      property_id: {
        type: Sequelize.STRING,
        primaryKey: true,

        allowNull: false,
      },
      condition: {
        type: Sequelize.STRING,
      },
      subType: {
        type: Sequelize.STRING,
      },
      furnishing: {
        type: Sequelize.ENUM("FURNISHED", "SEMI-FURNISHED", "UNFURNISHED"),
      },
      property_size: {
        type: Sequelize.STRING,
      },
      facilities: {
        type: Sequelize.STRING,
      },
      specifications: {
        type: Sequelize.STRING,
      },
      agency_fee: {
        type: Sequelize.STRING,
      },
      region: {
        type: Sequelize.STRING,
      },
      images: {
        type: Sequelize.STRING,
      },
      property_type: {
        type: Sequelize.ENUM(
          "duplex",
          "bungalow",
          "block of flats",
          "apartment",
          "townhouse/terrace",
          "chalet",
          "condo",
          "farm house",
          "house",
          "maisonette",
          "mansion",
          "mini flat",
          "penthouse",
          "room & parlour",
          "studio apartment",
          "villa"
        ),
      },
      price: {
        type: Sequelize.INTEGER,
      },
      bedrooms: {
        type: Sequelize.INTEGER,
      },
      bathrooms: {
        type: Sequelize.INTEGER,
      },
      availability: {
        type: Sequelize.ENUM(
          "AVAILABLE",
          "UNAVAILABLE",
          "SOLD",
          "LOCKED",
          "DELETED"
        ),
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
    return queryInterface.dropTable("Properties");
  },
};
