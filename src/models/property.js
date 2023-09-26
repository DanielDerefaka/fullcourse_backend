"use strict";
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define(
    "Property",
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4(),
      },
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      coordinates: DataTypes.STRING,
      views: DataTypes.INTEGER,
      property_address: DataTypes.STRING,
      property_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      condition: DataTypes.STRING,
      subType: DataTypes.STRING,
      furnishing: {
        type: DataTypes.ENUM("FURNISHED", "SEMI-FURNISHED", "UNFURNISHED"),
      },
      property_size: DataTypes.STRING,
      facilities: DataTypes.STRING,
      specifications: DataTypes.STRING,
      agency_fee: DataTypes.STRING,
      region: DataTypes.STRING,
      images: DataTypes.STRING,
      property_type: {
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
      price: DataTypes.INTEGER,
      bedrooms: DataTypes.INTEGER,
      bathrooms: DataTypes.INTEGER,
      availability: {
        type: DataTypes.ENUM(
          "AVAILABLE",
          "UNAVAILABLE",
          "SOLD",
          "LOCKED",
          "DELETED"
        ),
      },
    },
    {}
  );
  Property.associate = function (models) {
    // associations can be defined here
  };
  return Property;
};
