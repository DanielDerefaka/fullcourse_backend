"use strict";
module.exports = (sequelize, DataTypes) => {
  const InvestmentLog = sequelize.define(
    "InvestmentLog",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4(),
      },
      reference_id: DataTypes.STRING,
      project_name: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      ROI: DataTypes.DOUBLE,
      total: DataTypes.DOUBLE,
      amount_recieved: DataTypes.DOUBLE,
      start_date: DataTypes.STRING,
      end_date: DataTypes.STRING,
    },
    {}
  );
  InvestmentLog.associate = function (models) {
    // associations can be defined here
  };
  return InvestmentLog;
};
