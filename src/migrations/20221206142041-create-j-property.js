"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("j_properties", {
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
        allowNull: true,
      },
      j_type: {
        type: Sequelize.ENUM("Land", "House"),
        defaultValue: "Land",
        allowNull: false,
      },
      j_purchase_type: {
        type: Sequelize.ENUM("SALE", "RENT"),
        allowNull: true,
      },
      j_kind: {
        type: Sequelize.ENUM("PRIME", "CLASSIC", "LAYOUT"),
        defaultValue: "CLASSIC",
        allowNull: true,
      },
      j_agent_ref: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_cordinates: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      j_condition: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_furnishing: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_property_size: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_facilities: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_specifications: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_agency_fee: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_property_type: {
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
        allowNull: true,
      },
      j_price: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      j_bedrooms: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      j_bathrooms: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      j_availability: {
        type: Sequelize.ENUM(
          "AVAILABLE",
          "UNAVAILABLE",
          "SOLD",
          "LOCKED",
          "DELETED"
        ),

        defaultValue: "AVAILABLE",
        allowNull: true,
      },
      j_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_pps: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      j_desc: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      j_country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_img: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_layout: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      j_ip: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_status: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      j_admin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      j_deleted: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true,
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
    return queryInterface.dropTable("j_properties");
  },
};
