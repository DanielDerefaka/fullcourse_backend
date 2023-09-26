"use strict";
module.exports = (sequelize, DataTypes) => {
  const j_plans = sequelize.define(
    "j_plans",
    {
      j_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      j_transact_id: DataTypes.STRING,
      j_p_id: DataTypes.STRING,
      j_plan: DataTypes.STRING,
      j_period: { type: DataTypes.ENUM("Month", "Year") },
      j_interest: DataTypes.DOUBLE,
      j_amount_min: DataTypes.DOUBLE,
      j_amount_max: DataTypes.DOUBLE,
      j_sqm: DataTypes.STRING,
      j_pay_s: DataTypes.STRING,
      j_duration: DataTypes.DOUBLE,
      j_amount: DataTypes.DOUBLE,
      j_total_pay: DataTypes.DOUBLE,
      j_deleted: DataTypes.INTEGER,
      j_date: DataTypes.DATE,
      j_ip: DataTypes.STRING,
    },
    {}
  );
  j_plans.associate = function (models) {
    // associations can be defined here
  };
  return j_plans;
};
