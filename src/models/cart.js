"use strict";
module.exports = (sequelize, DataTypes) => {
  const cart = sequelize.define(
    "cart",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4(),
      },
      user_id: DataTypes.STRING,
      product_id: DataTypes.STRING,
      quantity: DataTypes.STRING,
    },
    {}
  );
  cart.associate = function (models) {
    // associations can be defined here
  };
  return cart;
};
