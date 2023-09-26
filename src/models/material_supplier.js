"use strict";
module.exports = (sequelize, DataTypes) => {
  const material_supplier = sequelize.define(
    "material_supplier",
    {
      name: DataTypes.STRING,
      user_id: {
        type: DataTypes.STRING,
      },
      supplier_ref: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
      },
      isVerified: {
        type: DataTypes.ENUM("VERIFIED", "UNVERIFIED"),
        defaultValue: "UNVERIFIED",
      },
    },
    {}
  );
  material_supplier.associate = function (models) {
    // associations can be defined here
  };
  return material_supplier;
};
