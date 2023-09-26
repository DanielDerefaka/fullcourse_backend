"use strict";
module.exports = (sequelize, DataTypes) => {
  const j_property = sequelize.define(
    "j_property",
    {
      j_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      j_user_id: DataTypes.STRING,
      j_transact_id: DataTypes.STRING,
      j_type: {
        type: DataTypes.ENUM("Land", "House"),
        defaultValue: "Land",
        allowNull: false,
      },
      j_purchase_type: {
        type: DataTypes.ENUM("SALE", "RENT"),
        allowNull: true,
      },
      j_kind: {
        type: DataTypes.ENUM("PRIME", "CLASSIC", "LAYOUT"),
        defaultValue: "CLASSIC",
        allowNull: false,
      },
      j_agent_ref: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      j_cordinates: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      j_condition: {
        type: DataTypes.STRING,
      },
      j_furnishing: {
        type: DataTypes.STRING,
      },
      j_property_size: {
        type: DataTypes.STRING,
      },
      j_facilities: {
        type: DataTypes.STRING,
      },
      j_specifications: {
        type: DataTypes.STRING,
      },
      j_agency_fee: {
        type: DataTypes.STRING,
      },
      j_property_type: {
        type: DataTypes.ENUM(
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
      j_price: {
        type: DataTypes.DOUBLE,
      },
      j_bedrooms: {
        type: DataTypes.DOUBLE,
      },
      j_bathrooms: {
        type: DataTypes.DOUBLE,
      },
      j_availability: {
        type: DataTypes.ENUM(
          "AVAILABLE",
          "UNAVAILABLE",
          "SOLD",
          "LOCKED",
          "DELETED"
        ),
        defaultValue: "AVAILABLE",
        allowNull: false,
      },
      j_title: DataTypes.STRING,
      j_pps: DataTypes.DOUBLE,
      j_desc: DataTypes.STRING,
      j_country: DataTypes.STRING,
      j_state: DataTypes.STRING,
      j_city: DataTypes.STRING,
      j_address: DataTypes.STRING,
      j_img: DataTypes.STRING,
      j_layout: DataTypes.STRING,
      j_date: DataTypes.DATE,
      j_ip: DataTypes.STRING,
      j_status: DataTypes.INTEGER,
      j_admin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      j_deleted: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {}
  );
  j_property.associate = function (models) {
    // associations can be defined here
  };
  return j_property;
};
