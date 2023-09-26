'use strict';
module.exports = (sequelize, DataTypes) => {
  const j_bank = sequelize.define('j_bank', {
    j_id: DataTypes.INTEGER,
    j_username: DataTypes.STRING,
    j_bank: DataTypes.STRING,
    j_bank_code: DataTypes.STRING,
    j_bank_num: DataTypes.STRING,
    j_account_no: DataTypes.STRING,
    j_account_name: DataTypes.STRING,
    j_date: DataTypes.DATE,
    j_deleted: DataTypes.INTEGER
  }, {});
  j_bank.associate = function(models) {
    // associations can be defined here
  };
  return j_bank;
};