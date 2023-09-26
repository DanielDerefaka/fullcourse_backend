"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("j_users", {
      j_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      j_referrer_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_referral_bonus_buyer: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      j_username: {
        type: Sequelize.STRING,
      },
      j_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      j_wallet: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      j_referral_bonus_agent: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      j_last_td: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      j_sms_unit: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      j_status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE", "SUSPENDED"),
        allowNull: true,
      },
      j_account_type: {
        type: Sequelize.STRING,
      },
      j_branch: {
        type: Sequelize.STRING,
      },
      j_gender: {
        type: Sequelize.STRING,
        type: Sequelize.ENUM("MALE", "FEMALE"),
        allowNull: false,
      },
      j_class: {
        type: Sequelize.ENUM(
          "REGULAR",
          "PROPERTY-AGENT",
          "VENDOR",
          "AGENT",
          "SUPPLIER"
        ),
      },
      j_firstname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_lastname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_dob: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      j_passport: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_valid_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_cv: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_b_month: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      j_b_day: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      j_b_year: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      j_country: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      j_state: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      j_city: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      j_address: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      j_phone_code: {
        type: Sequelize.STRING,
      },
      j_phone: { type: Sequelize.STRING },
      j_email: {
        type: Sequelize.STRING,
      },
      j_bvn: {
        type: Sequelize.STRING,
      },
      j_by: {
        type: Sequelize.STRING,
      },
      j_date: {
        type: Sequelize.DATE,
      },
      j_logins: {
        type: Sequelize.DOUBLE,
      },
      j_last_seen: {
        type: Sequelize.DATE,
      },
      j_last_seen_update: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      j_r_mail: {
        type: Sequelize.INTEGER,
      },
      j_r_sms: {
        type: Sequelize.INTEGER,
      },
      j_blocked: {
        type: Sequelize.INTEGER,
      },
      j_deleted: {
        type: Sequelize.INTEGER,
      },
      j_verify: {
        type: Sequelize.INTEGER,
      },
      j_online: {
        type: Sequelize.INTEGER,
      },
      j_b_name: {
        type: Sequelize.STRING,
      },
      j_b_no: {
        type: Sequelize.STRING,
      },
      j_b_country: {
        type: Sequelize.STRING,
      },
      j_b_state: {
        type: Sequelize.STRING,
      },
      j_b_city: {
        type: Sequelize.STRING,
      },
      j_b_email: {
        type: Sequelize.STRING,
      },
      j_b_phone: {
        type: Sequelize.STRING,
      },
      J_m_request: {
        type: Sequelize.INTEGER,
      },
      J_m_request: {
        type: Sequelize.INTEGER,
      },
      J_m_approve: {
        type: Sequelize.INTEGER,
      },
      j_currency: {
        type: Sequelize.STRING,
      },
      j_otp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_nin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_id_card: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      j_currency_code: {
        type: Sequelize.STRING,
      },
      j_currency_sort: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("j_users");
  },
};
