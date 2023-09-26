"use strict";
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4(),
        type: DataTypes.UUID,
      },

      type: {
        allowNull: false,
        type: DataTypes.ENUM(
          "TOP-UP",
          "INVESTMENT",
          "PROPERTY-BUY",
          "MATERIAL",
          "HOUSING"
        ),
      },
      kind: {
        type: DataTypes.ENUM("CREDIT", "DEBIT"),
      },
      amount: DataTypes.DOUBLE,
      description: { type: DataTypes.STRING, allowNull: true },

      reference_id: DataTypes.STRING,
      payment_method: DataTypes.STRING,
      user_id: DataTypes.STRING,
    },
    {}
  );
  Payment.associate = function (models) {
    // associations can be defined here
  };
  return Payment;
};
