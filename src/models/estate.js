"use strict";
module.exports = (sequelize, DataTypes) => {
  const Estate = sequelize.define(
    "Estate",
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4(),
        primaryKey: true,
        type: DataTypes.UUID,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      from_amount: DataTypes.INTEGER,
      cordinates: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      to_amount: DataTypes.INTEGER,
      property_id: DataTypes.STRING,
      location: DataTypes.STRING,
      images: DataTypes.STRING,
    },
    {}
  );
  Estate.associate = function (models) {
    // associations can be defined here
  };
  return Estate;
};
