"use strict";
module.exports = (sequelize, DataTypes) => {
  const PropertyLogs = sequelize.define(
    "PropertyLogs",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      property: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("ACTIVE", "INACTIVE", "SOLD", "DELETED"),
        defaultValue: "ACTIVE",
      },
      amount_paid: DataTypes.INTEGER,
      property_price: DataTypes.INTEGER,
      cordinates: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      purchase_date: DataTypes.STRING,
      buyer: DataTypes.STRING,
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      client: DataTypes.STRING,
      reference_id: DataTypes.STRING,
    },
    {}
  );
  PropertyLogs.associate = function (models) {
    // associations can be defined here
  };
  return PropertyLogs;
};
