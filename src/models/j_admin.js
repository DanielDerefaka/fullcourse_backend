"use strict";
module.exports = (sequelize, DataTypes) => {
  const j_admin = sequelize.define(
    "j_admin",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4(),
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: { type: DataTypes.ENUM("super_admin", "admin", "regular") },
      phoneNumber: DataTypes.STRING,
      status: { type: DataTypes.ENUM("APPROVED", "UNAPPROVED", "SUSPENDED") },
    },
    {}
  );
  j_admin.associate = function (models) {
    // associations can be defined here
  };
  return j_admin;
};
