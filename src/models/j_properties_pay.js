'use strict';
module.exports = (sequelize, DataTypes) => {
  const j_properties_pay = sequelize.define('j_properties_pay', {
    j_id: DataTypes.INTEGER,
    j_user_id: DataTypes.STRING,
    j_transact_id: DataTypes.STRING,
    j_property_sub_id: DataTypes.STRING,
    j_property_id: DataTypes.STRING,
    j_reserve_id: DataTypes.STRING,
    j_layers: DataTypes.STRING,
    j_currency: DataTypes.STRING,
    j_amount: DataTypes.DOUBLE,
    j_date: DataTypes.DATE,
    j_paid: DataTypes.INTEGER,
    j_end_date: DataTypes.DATE,
    j_ip: DataTypes.STRING,
    j_deleted: DataTypes.INTEGER
  }, {});
  j_properties_pay.associate = function(models) {
    // associations can be defined here
  };
  return j_properties_pay;
};