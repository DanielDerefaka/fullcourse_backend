"use strict";
module.exports = (sequelize, DataTypes) => {
  const property_agent = sequelize.define(
    "property_agent",
    {
      name: { type: DataTypes.STRING, allowNull: true },
      email: { type: DataTypes.STRING, allowNull: true },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("verified", "unverified", "suspended"),
        defaultValue: "unverified",
        allowNull: true,
      },
      user_id: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      agent_ref: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {}
  );
  property_agent.associate = function (models) {
    // associations can be defined here
  };
  return property_agent;
};
