// import db from "../config/sequelize";
const db = require("../config/sequelize");
const { j_property, j_plans } = require("../models");
const { validationResult } = require("express-validator");
const generateID = require("../helpers/generateID");

exports.new_plan = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  //destructure the body
  let transaction = await db.sequelize.transaction();
  let saveOperation = null;
  //check for possible duplicate transaction id

  try {
    const {
      property_id,
      period,
      interest,
      amount_min,
      amount_max,
      duration,
      plan,
    } = req.body;

    //gather information for the plot from the property_id
    const allPlans = await j_plans.findAll();

    // console.log(allPlans);

    let j_transact_id = `P-${allPlans.length}-${generateID(8)}`;

    const Property = await j_property.findOne({
      where: {
        j_id: property_id,
      },
    });

    if (!Property) {
      throw new Error("Property does not exist");
    }
    const { j_title } = Property;

    const isExist = await j_plans.findOne({
      where: {
        j_plan: plan || j_title,
      },
    });
    if (isExist) throw new Error("Duplicate data");

    //check for transact id

    //destructure property items

    const payload = {
      j_transact_id,
      j_p_id: property_id,
      j_plan: plan || j_title,
      j_period: period,
      j_interest: interest,
      j_amount_min: amount_min,
      j_amount_max: amount_max,
      j_duration: duration || 2,
      j_admin: "admin", // this is for development, id will be gotten from middle ware
    };

    saveOperation = await j_plans.create(payload, {
      transaction,
    });

    if (!saveOperation) throw new Error("failed transaction");

    await transaction.commit();

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Investment plan have been added successfully",
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.update_plan = (req, res) => {};

exports.showAll = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  try {
    const retrieval = await j_plans.findAll();

    //check if it's empty

    return res.status(200).json({
      success: true,
      data: retrieval,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
