// import db from "../config/sequelize";
const db = require("../config/sequelize");
const {
  Payment,
  PropertyLogs,
  InvestmentLog,
  Wallet,
  j_pay,
  j_plans,
} = require("../models");
const { validationResult } = require("express-validator");
const PaymentTypes = require("../helpers/PaymentTypes");
const PaymentKind = require("../helpers/PaymentKind");
const generateID = require("../helpers/generateID");
const { addDays } = require("date-fns");

//CREATE
exports.newPayment = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  const { user_id } = req.user;

  // console.log("")

  //destructure the body
  let transaction = await db.sequelize.transaction();

  try {
    const {
      type,
      amount,
      description,
      location,
      reference_id,
      payment_method,
      plan_id,
      duration,
      property,
      status,
      amount_paid,
      purchase_date,
      buyer,
      client,
      project_name,
      amount_received,
      start_date,
      end_date,
      ROI,
      total,
      property_price,
      cordinates,
    } = req.body;

    //check for the type of the transaction

    if (type === PaymentTypes.TOP_UP) {
      //CALL THE TOP UP FUNCTION
      return TOP_UP({
        type,
        amount,
        reference_id,
        payment_method,
        user_id,
        transaction,
        res,
      });
    } else if (type === PaymentTypes.INVESTMENT) {
      return INVESTMENT({
        type,
        reference_id,
        project_name,
        duration,
        total,
        amount_received,
        payment_method,
        amount,
        start_date,
        end_date,
        transaction,
        user_id,
        plan_id,
        req,

        res,
      });
    } else if (type === PaymentTypes.PROPERTY_BUY) {
      return PROPERTY_BUY({
        type,
        // description,
        payment_method,
        property,
        status,
        amount_paid,
        amount,
        property_price,
        purchase_date,
        buyer,
        location,
        client,
        reference_id,
        cordinates,
        user_id,
        transaction,
        res,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment type not recognized, Please contact support",
      });
    }
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const TOP_UP = async (payload) => {
  //destructure payload
  const {
    type,
    // main_balance,
    user_id,
    kind,
    amount,
    description,
    reference_id,
    payment_method,
    transaction,
    res,
  } = payload;
  let tempAmount = 0;
  let createLog = null;

  try {
    const addPayment = await j_pay.create(
      {
        j_kind: type,
        j_type: PaymentKind.CREDIT,
        j_amount: amount,
        j_desc: "This is a demo Top-up",
        j_transact_id: reference_id,
        j_gateway: payment_method,
        j_user_id: user_id,
        j_date: new Date(),
        j_currency: "NGN",
      },
      { transaction }
    );

    if (!addPayment.j_id) {
      throw new Error("cannot jump please try again");
    }

    //check if wallet is alaready existing

    const isExist = await Wallet.findOne({
      where: {
        user_id,
      },
    });

    if (isExist) {
      const { main_balance } = isExist;
      //carry out update function
      tempAmount = main_balance + parseInt(amount);
      // encrypt the wallet balance before storing in the database  to curb manipulation

      createLog = await Wallet.update(
        { main_balance: tempAmount },

        {
          where: {
            user_id,
          },
          transaction,
        }
      );
    } else {
      createLog = await Wallet.create(
        { main_balance: amount, user_id },
        { transaction }
      );
    }

    if (!createLog) {
      throw new Error("cannot continue please contact support");
    }

    await transaction.commit();
    return res.status(200).json({
      success: true,
      message: "Payment have been added successfully",
      createLog,
      addPayment,
    });
  } catch (err) {
    // await transaction.rollback();
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const INVESTMENT = async (payload) => {
  //destructure payload
  const {
    type,
    amount,
    payment_method,
    property_id,
    plan_id,
    duration,
    user_id,
    reference_id,
    transaction,
    res,
    //get plan id
  } = payload;
  let final_interest = 0;
  let end_date = "";

  let j_transact_id = `P-${generateID(3)}${Date.now()}`;

  try {
    const getPlanInfo = await j_plans.findOne({
      where: {
        j_id: plan_id,
      },
    });
    if (!getPlanInfo) throw new Error("Invalid plan");

    const { j_interest, j_amount_min, j_amount_max, j_plan } = getPlanInfo;

    //check the investment amount if it falls under the min and max

    if (!(amount >= j_amount_min) && !(amount <= j_amount_max)) {
      throw new Error(
        `Investment amount must be within ${j_amount_min} and ${j_amount_max}`
      );
    }

    //calculate the end date
    end_date = addDays(new Date(), 30 * parseInt(duration));

    //get the interest
    final_interest = Number(j_interest * (parseInt(duration) || 1));
    let roi = final_interest * 0.01 * parseInt(amount);

    console.log(final_interest, end_date);

    // add the payment

    const addPayment = await j_pay.create(
      {
        j_user_id: user_id,
        j_transact_id: reference_id,
        j_profit: Number(roi + parseInt(amount)),
        j_gateway: payment_method,
        j_currency: "NGN",
        j_amount: amount,
        j_date: new Date(),
        j_status: 1,
        j_paid: 0,
        j_disburse: 0,
        j_type: "debit",
        j_kind: type,
        j_desc: `Investment of ${amount}`,
        j_duration: duration,
        j_interest: final_interest,
        j_roi: roi,
        j_total: Number(roi + parseInt(amount)),
        j_end_date: end_date, // this needs to be added
        j_deleted: 0,
      },
      {
        transaction,
      }
    );

    if (!addPayment)
      throw new Error(" Encountered an issue, please contact support");

    await transaction.commit();
    return res.status(200).json({
      success: true,
      message: "Payment ",
    });
  } catch (err) {
    await transaction.rollback();
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const PROPERTY_BUY = async (payload) => {
  //destructure payload
  const {
    type,
    // description,
    payment_method,
    property,
    status,
    amount_paid,
    property_price,
    purchase_date,
    buyer,
    location,
    client,
    reference_id,
    amount,
    user_id,
    cordinates,
    transaction,
    res,
  } = payload;

  try {
    const addPayment = await Payment.create(
      {
        type,
        kind: PaymentKind.DEBIT,
        amount,
        description: "This is for a payment of property ",
        reference_id,
        payment_method,
        user_id,
      },
      { transaction }
    );

    if (!addPayment.j_id) {
      throw new Error("cannot fly please try again");
    }

    const createLog = await PropertyLogs.create(
      {
        property,
        // status
        amount_paid,
        property_price,
        purchase_date,
        buyer,
        location: "location in mind",
        client,
        reference_id,
        cordinates,
      },
      { transaction }
    );

    if (!createLog.j_id) {
      throw new Error("cannot continue please contact support");
    }

    await transaction.commit();
    return res.status(200).json({
      success: true,
      message: "Payment have been added successfully",
      addPayment,
      createLog,
    });
  } catch (err) {
    await transaction.rollback();
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

//READ
exports.showAllPayment = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  // const { user_id } = req.body;
  let payload = {};
  let data = [];

  try {
    //get all the payments

    const fetchAllPayment = await j_pay.findAll();

    if (!fetchAllPayment) throw new Error("Couldn't fetch payment, try again");

    //LOOP THROUGH THE PAYMENTS AND RETURN ADEQUATE INFORMATION

    // for (const payment of AllPayments) {
    //   // console.log(payment);
    //   //check for several cases

    //   //destructure payment
    //   const {
    //     id,
    //     type,
    //     kind,
    //     amount,
    //     description,
    //     reference_id,
    //     payment_method,
    //     user_id,
    //   } = payment;

    //   if (payment.type === PaymentTypes.TOP_UP) {
    //     payload = {
    //       id,
    //       type,
    //       kind,
    //       amount,
    //       description,
    //       reference_id,
    //       payment_method,
    //       user_id,
    //     };
    //     data.push(payload);
    //     //
    //   } else if (payment.type === PaymentTypes.PROPERTY_BUY) {
    //     // payload = {
    //     //   payment,
    //     // };

    //     const getPropertyLogs = await PropertyLogs.findOne({
    //       where: {
    //         reference_id: payment.reference_id,
    //       },
    //     });
    //     const {
    //       property,
    //       status,
    //       amount_paid,
    //       property_price,
    //       cordinates,
    //       purchase_date,
    //       buyer,
    //       client,
    //       location,
    //     } = getPropertyLogs;
    //     payload = {
    //       id,
    //       type,
    //       kind,
    //       amount,
    //       description,
    //       reference_id,
    //       payment_method,
    //       user_id,
    //       property,
    //       status,
    //       amount_paid,
    //       property_price,
    //       cordinates,
    //       purchase_date,
    //       buyer,
    //       client,
    //       location,
    //     };

    //     data.push(payload);
    //   } else if (payment.type === PaymentTypes.INVESTMENT) {
    //     const getInvestmentLogs = await InvestmentLog.findOne({
    //       where: {
    //         reference_id: payment.reference_id,
    //       },
    //     });

    //     if (!getInvestmentLogs) {
    //       payload = {
    //         id,
    //         type,
    //         kind,
    //         amount,
    //         description,
    //         reference_id,
    //         payment_method,
    //         user_id,
    //       };
    //       data.push(payload);
    //     } else {
    //       const {
    //         project_name,
    //         duration,
    //         ROI,
    //         total,
    //         amount_recieved,
    //         start_date,
    //         end_date,
    //       } = getInvestmentLogs;
    //       payload = {
    //         id,
    //         type,
    //         kind,
    //         amount,
    //         description,
    //         reference_id,
    //         payment_method,
    //         user_id,
    //         project_name,
    //         duration,
    //         ROI,
    //         total,
    //         amount_recieved,
    //         start_date,
    //         end_date,
    //       };
    //       data.push(payload);
    //     }
    //   }
    // }

    return res.status(200).json({
      success: true,
      data: fetchAllPayment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.showPaymentForUser = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  const { user_id } = req.user;

  try {
    //get all the payments

    const fetchAllPayment = await j_pay.findAll({
      where: {
        j_user_id: user_id,
      },
    });

    if (!fetchAllPayment) throw new Error("Couldn't fetch payment, try again");

    return res.status(200).json({
      success: true,
      data: fetchAllPayment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
