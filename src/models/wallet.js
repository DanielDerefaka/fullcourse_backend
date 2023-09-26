"use strict";
module.exports = (sequelize, DataTypes) => {
  const wallet = sequelize.define(
    "wallet",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4(),
      },
      user_id: DataTypes.STRING,
      balance: DataTypes.STRING,
      ledger: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("ACTIVE", "SUSPENDED"),
        defaultValue: "ACTIVE",
      },
    },
    {}
  );
  wallet.associate = function (models) {
    // associations can be defined here
  };
  return wallet;
};
