"use strict";
module.exports = (sequelize, DataTypes) => {
  const j_user = sequelize.define(
    "j_user",
    {
      j_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      j_referrer_id: DataTypes.STRING,
      j_referral_bonus_buyer: DataTypes.DOUBLE,
      j_username: DataTypes.STRING,
      j_password: DataTypes.STRING,
      j_wallet: DataTypes.DOUBLE,
      j_referral_bonus_agent: DataTypes.DOUBLE,
      j_last_td: DataTypes.DATE,
      j_sms_unit: DataTypes.DOUBLE,
      j_status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE", "SUSPENDED") },
      j_account_type: DataTypes.STRING,
      j_branch: DataTypes.STRING,
      j_gender: {
        type: DataTypes.ENUM("MALE", "FEMALE"),
      },
      j_class: {
        type: DataTypes.ENUM(
          "REGULAR",
          "PROPERTY-AGENT",
          "VENDOR",
          "AGENT",
          "SUPPLIER"
        ),
      },

      j_firstname: DataTypes.STRING,
      j_lastname: DataTypes.STRING,
      j_dob: DataTypes.DATE,
      j_passport: DataTypes.STRING,
      j_valid_id: DataTypes.STRING,
      j_cv: DataTypes.STRING,
      j_b_month: DataTypes.INTEGER,
      j_b_day: DataTypes.INTEGER,
      j_b_year: DataTypes.INTEGER,
      j_country: DataTypes.STRING,
      j_state: DataTypes.STRING,
      j_city: DataTypes.STRING,
      j_address: DataTypes.STRING,
      j_phone: { type: DataTypes.STRING },
      j_phone_code: DataTypes.STRING,
      j_email: DataTypes.STRING,
      j_bvn: DataTypes.STRING,
      j_by: DataTypes.STRING,
      j_date: DataTypes.DATE,
      j_logins: DataTypes.DOUBLE,
      j_last_seen: DataTypes.DATE,
      j_last_seen_update: DataTypes.DATE,
      j_r_mail: DataTypes.INTEGER,
      j_r_sms: DataTypes.INTEGER,
      j_blocked: DataTypes.INTEGER,
      j_deleted: DataTypes.INTEGER,
      j_verify: DataTypes.INTEGER,
      j_online: DataTypes.INTEGER,
      j_b_name: DataTypes.STRING,
      j_b_no: DataTypes.STRING,
      j_b_country: DataTypes.STRING,
      j_b_state: DataTypes.STRING,
      j_b_city: DataTypes.STRING,
      j_b_email: DataTypes.STRING,
      j_b_phone: DataTypes.STRING,
      J_m_request: DataTypes.INTEGER,
      J_m_request: DataTypes.INTEGER,
      J_m_approve: DataTypes.INTEGER,
      j_currency: DataTypes.STRING,
      j_otp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      j_nin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      j_id_card: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      j_currency_code: DataTypes.STRING,
      j_currency_sort: DataTypes.STRING,
    },
    {}
  );
  j_user.associate = function (models) {
    // associations can be defined here
  };
  return j_user;
};
