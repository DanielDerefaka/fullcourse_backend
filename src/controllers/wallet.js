// import db from "../config/sequelize";
const db = require("../config/sequelize");
const { j_user, j_admin, wallet } = require("../models");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const uuid = require("uuid").v4;
const jwt = require("jsonwebtoken");
const { decryption, encryption } = require("../encryption/encrypt");

// const loan = require("../../../models/loan");
// import { lend } from '../../web3/web.controller';

exports.topup = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(401).json({
      error: error.array(),
    });
  }

  const { user_id } = req.user;
  //sequelize transaction
  const { amount } = req.body;

  const transaction = await db.sequelize.transaction();
  try {
    //verify transaction

    const user = await j_user.findOne({
      where: {
        j_id: user_id,
      },
    });

    if (!user) {
      throw new Error("No user found ");
    }

    //fetch wallet balance
    const fetchWallet = await wallet.findOne({
      where: {
        user_id,
      },
    });

    if (!fetchWallet) {
      throw new Error("No wallet was found for user ");
    }

    const { balance } = fetchWallet;

    const decrypted_bal = Number(decryption(balance));

    const new_balance = decrypted_bal + Number(amount);

    //
    //ADD BALANCE TO TRANSACTION

    const updateWallet = await wallet.update(
      {
        balance: encryption(new_balance),
      },
      {
        where: {
          user_id,
        },
        transaction,
      }
    );

    if (!updateWallet) {
      throw new Error("cannot update");
    }
    transaction.commit();
    return res.status(200).json({
      success: true,
      message: "Top up successful",
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: "Failed to create user: " + error.message,
    });
  }
};

exports.balance = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(401).json({
      error: error.array(),
    });
  }

  const { user_id } = req.user;
  //sequelize transaction

  try {
    const user = await j_user.findOne({
      where: {
        j_id: user_id,
      },
    });

    if (!user) {
      throw new Error("No user found ");
    }

    //fetch wallet balance
    let fetchWallet = await wallet.findOne({
      where: {
        user_id,
      },
    });

    if (!fetchWallet) {
      throw new Error("No wallet was found for user ");
    }

    const { balance } = fetchWallet;

    const decrypted_bal = Number(decryption(balance));
    fetchWallet.dataValues.balance = decrypted_bal.toString();
    // fetchWallet.dataValues.balance = decrypted_bal;

    return res.status(200).json({
      success: true,
      data: fetchWallet,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create user: " + error.message,
    });
  }
};
