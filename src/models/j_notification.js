'use strict';
module.exports = (sequelize, DataTypes) => {
  const j_notification = sequelize.define('j_notification', {
    j_id: DataTypes.INTEGER,
    j_group_id: DataTypes.STRING,
    j_user_id: DataTypes.STRING,
    j_subject: DataTypes.STRING,
    j_message: DataTypes.STRING,
    j_date: DataTypes.DATE,
    j_read: DataTypes.STRING,
    j_deleted: DataTypes.INTEGER
  }, {});
  j_notification.associate = function(models) {
    // associations can be defined here
  };
  return j_notification;
};