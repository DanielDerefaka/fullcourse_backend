"use strict";
module.exports = (sequelize, DataTypes) => {
  const j_properties_sub_reserve = sequelize.define(
    "j_properties_sub_reserve",
    {
      j_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      j_user_id: DataTypes.STRING,
      j_referrer_id: DataTypes.DOUBLE,
      j_transact_id: DataTypes.STRING,
      j_property_sub_id: DataTypes.STRING,
      j_property_id: DataTypes.STRING,
      j_qty: DataTypes.DOUBLE,
      j_duration: DataTypes.DOUBLE,
      j_period: DataTypes.STRING,
      j_layers: DataTypes.STRING,
      j_name: DataTypes.STRING,
      j_gender: DataTypes.STRING,
      j_country: DataTypes.STRING,
      j_state: DataTypes.STRING,
      j_address: DataTypes.STRING,
      j_phone: DataTypes.STRING,
      j_email: DataTypes.STRING,
      j_dob: DataTypes.STRING,
      j_occupation: DataTypes.STRING,
      j_date: DataTypes.DATE,
      j_next_pay_date: DataTypes.DATE,
      j_ip: DataTypes.STRING,
      j_amount: DataTypes.DOUBLE,
      j_interest: DataTypes.DOUBLE,
      j_interest_rate: DataTypes.DOUBLE,
      j_total: DataTypes.DOUBLE,
      j_amount_paid: DataTypes.DOUBLE,
      j_paid: DataTypes.INTEGER,
      j_deleted: DataTypes.INTEGER,
    },
    {}
  );
  j_properties_sub_reserve.associate = function (models) {
    // associations can be defined here
  };
  return j_properties_sub_reserve;
};
