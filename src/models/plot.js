"use strict";
module.exports = (sequelize, DataTypes) => {
  const Plot = sequelize.define(
    "Plot",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      plot_size: DataTypes.DOUBLE,
      plot_id: DataTypes.STRING,
      property_id: DataTypes.STRING,
      status: DataTypes.STRING,
      purchase_order_id: DataTypes.STRING,
      cordinates: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customer: DataTypes.STRING,
      administrator: DataTypes.STRING,
    },
    {}
  );
  Plot.associate = function (models) {
    // associations can be defined here
  };
  return Plot;
};
