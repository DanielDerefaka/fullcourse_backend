"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("j_pays", {
      j_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      j_user_id: {
        type: Sequelize.STRING,
      },
      j_reciepient_id: {
        type: Sequelize.STRING,
      },
      j_sender_id: {
        type: Sequelize.STRING,
      },
      j_referrer_id: {
        type: Sequelize.STRING,
      },
      j_bonus: {
        type: Sequelize.DOUBLE,
      },
      j_transact_id: {
        type: Sequelize.STRING,
      },
      j_property_sub_id: {
        type: Sequelize.STRING,
      },
      j_property_id: {
        type: Sequelize.STRING,
      },
      j_plan_id: {
        type: Sequelize.STRING,
      },
      j_plan_id: {
        type: Sequelize.STRING,
      },
      j_plan: {
        type: Sequelize.STRING,
      },
      j_plan_amount: {
        type: Sequelize.DOUBLE,
      },
      j_durations_sm: {
        type: Sequelize.DOUBLE,
      },
      j_interest_d: {
        type: Sequelize.DOUBLE,
      },
      j_interest_amount_d: {
        type: Sequelize.DOUBLE,
      },
      j_roi:{
        type: Sequelize.DOUBLE,
      },
      j_next_pay_date: {
        type: Sequelize.DATE,
      },
      j_profit: {
        type: Sequelize.DOUBLE,
      },
      j_period: {
        type: Sequelize.STRING,
      },
      j_reserve_id: {
        type: Sequelize.STRING,
      },
      j_layers: {
        type: Sequelize.STRING,
      },
      j_purchased_date: {
        type: Sequelize.DATE,
      },
      j_ref: {
        type: Sequelize.STRING,
      },
      j_refund_id: {
        type: Sequelize.STRING,
      },
      j_gateway: {
        type: Sequelize.ENUM("PAYSTACK", "BANK TRANSFER", "WALLET", "CASH"),
      },
      j_currency: {
        type: Sequelize.STRING,
      },
      j_amount: {
        type: Sequelize.DOUBLE,
      },
      j_sms_unit: {
        type: Sequelize.DOUBLE,
      },
      j_package: {
        type: Sequelize.STRING,
      },
      j_bal: {
        type: Sequelize.DOUBLE,
      },
      j_coupon: {
        type: Sequelize.STRING,
      },
      j_bal_coupon: {
        type: Sequelize.DOUBLE,
      },
      j_date: {
        type: Sequelize.DATE,
      },
      j_blank_num: {
        type: Sequelize.STRING,
      },
      j_bank_code: {
        type: Sequelize.STRING,
      },
      j_bank: {
        type: Sequelize.STRING,
      },
      j_account_no: {
        type: Sequelize.STRING,
      },
      j_biller_code: {
        type: Sequelize.STRING,
      },
      j_item_code: {
        type: Sequelize.STRING,
      },
      j_network_name: {
        type: Sequelize.STRING,
      },
      j_phone: {
        type: Sequelize.STRING,
      },
      j_status: {
        type: Sequelize.STRING,
      },
      j_msg: {
        type: Sequelize.STRING,
      },
      j_paid: {
        type: Sequelize.INTEGER,
      },
      j_disburse: {
        type: Sequelize.INTEGER,
      },
      j_t_recipient_code: {
        type: Sequelize.STRING,
      },
      j_t_transfer_code: {
        type: Sequelize.STRING,
      },
      j_type: {
        type: Sequelize.ENUM("CREDIT", "DEBIT"),
      },
      j_kind: {
        type: Sequelize.ENUM(
          "TOP-UP",
          "INVESTMENT",
          "PROPERTY-BUY",
          "MATERIAL",
          "HOUSING",
          "A-CREDIT",
          "REFERRAL-BONUS"
        ),
      },
      j_desc: {
        type: Sequelize.STRING,
      },
      j_duration: {
        type: Sequelize.STRING,
      },
      j_interest: {
        type: Sequelize.DOUBLE,
      },
      j_interest_amount: {
        type: Sequelize.DOUBLE,
      },
      j_total: {
        type: Sequelize.DOUBLE,
      },
      j_end_date: {
        type: Sequelize.DATE,
      },
      j_crypto: {
        type: Sequelize.STRING,
      },
      j_crypto_address: {
        type: Sequelize.STRING,
      },
      j_amount_crypto: {
        type: Sequelize.DOUBLE,
      },
      j_profit_crypto: {
        type: Sequelize.DOUBLE,
      },
      j_processing_fee_crypto: {
        type: Sequelize.DOUBLE,
      },
      j_total_debit_crypto: {
        type: Sequelize.DOUBLE,
      },
      j_amount_ngn: {
        type: Sequelize.DOUBLE,
      },
      j_processing_fee_ngn: {
        type: Sequelize.DOUBLE,
      },
      j_profit_ngn: {
        type: Sequelize.DOUBLE,
      },
      j_total_charge_ngn: {
        type: Sequelize.DOUBLE,
      },
      j_total_debit_ngn: {
        type: Sequelize.DOUBLE,
      },
      j_amount_usd: {
        type: Sequelize.DOUBLE,
      },
      j_processing_fee_usd: {
        type: Sequelize.DOUBLE,
      },
      j_profit_usd: {
        type: Sequelize.DOUBLE,
      },
      j_total_charge_usd: {
        type: Sequelize.DOUBLE,
      },
      j_total_debit_usd: {
        type: Sequelize.DOUBLE,
      },
      j_proof: {
        type: Sequelize.STRING,
      },
      j_ip: {
        type: Sequelize.STRING,
      },
      j_deleted: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable("j_pays");
  },
};
