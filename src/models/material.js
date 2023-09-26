"use strict";
module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define(
    "Material",
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,

        // defaultValue: DataTypes.UUIDV4,
        autoIncrement: true,
        primaryKey: true,
      },
      item_name: DataTypes.STRING,
      item_id: { type: DataTypes.STRING, allowNull: false },
      category: DataTypes.STRING,
      availability: {
        type: DataTypes.ENUM("available", "unavailable", "sold"),
        defaultValue: "available",
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      amount: DataTypes.INTEGER,
      currency: DataTypes.STRING,
      discount: DataTypes.INTEGER,
      product_details: DataTypes.STRING,
      product_description: DataTypes.STRING,

      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      view_count: DataTypes.INTEGER,
      supplier_ref: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uploaded_by: DataTypes.STRING,
      tags: DataTypes.STRING,
    },
    {}
  );
  Material.associate = function (models) {
    // associations can be defined here
  };
  return Material;
};
