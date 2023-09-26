"use strict";
module.exports = (sequelize, DataTypes) => {
  const j_properties_sub = sequelize.define(
    "j_properties_sub",
    {
      j_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      j_user_id: DataTypes.STRING,
      j_transact_id: DataTypes.STRING,
      j_property_id: DataTypes.STRING,
      j_type: DataTypes.STRING,
      j_title: DataTypes.STRING,
      j_amount: DataTypes.DOUBLE,
      j_amount_old: DataTypes.DOUBLE,
      j_period: DataTypes.STRING,
      j_qty: DataTypes.DOUBLE,
      j_p_no: DataTypes.STRING,
      j_desc: DataTypes.STRING,
      j_country: DataTypes.STRING,
      j_state: DataTypes.STRING,
      j_city: DataTypes.STRING,
      j_address: DataTypes.STRING,
      j_img: DataTypes.STRING,
      j_date: DataTypes.DATE,
      j_ip: DataTypes.STRING,
      j_status: DataTypes.INTEGER,
      j_admin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      j_deleted: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {}
  );
  j_properties_sub.associate = function (models) {
    // associations can be defined here
  };
  return j_properties_sub;
};
