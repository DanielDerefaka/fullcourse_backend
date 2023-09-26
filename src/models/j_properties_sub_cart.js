'use strict';
module.exports = (sequelize, DataTypes) => {
  const j_properties_sub_cart = sequelize.define('j_properties_sub_cart', {
    j_id: DataTypes.INTEGER,
    j_user_id: DataTypes.STRING,
    j_transact_id: DataTypes.STRING,
    j_property_sub_id: DataTypes.STRING,
    j_property_id: DataTypes.STRING,
    j_p_no: DataTypes.STRING,
    j_title: DataTypes.STRING,
    j_qty: DataTypes.DOUBLE,
    j_currency: DataTypes.STRING,
    j_amount: DataTypes.DOUBLE,
    j_total: DataTypes.DOUBLE,
    j_date: DataTypes.DATE,
    j_ip: DataTypes.STRING,
    j_status: DataTypes.INTEGER,
    j_deleted: DataTypes.INTEGER
  }, {});
  j_properties_sub_cart.associate = function(models) {
    // associations can be defined here
  };
  return j_properties_sub_cart;
};