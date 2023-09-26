// import db from "../config/sequelize";
const db = require("../config/sequelize");
const { Estate, Plot, Material } = require("../models");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.add = async (req, res) => {
  const error = validationResult(req);

  let transaction = await db.sequelize.transaction();

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  //destructure
  const {
    title,
    description,
    from_amount,
    to_amount,
    images,
    property_id,
    location,
    coordinates,
  } = req.body;
  console.log(req.body);
  try {
    const isExist = await Estate.findOne({
      where: {
        property_id,
      },
    });

    if (isExist) {
      throw new Error("Property already Exist");
    }

    const property_payload = {
      title,
      description,
      from_amount,
      to_amount,
      property_id,
      location,
      images,
      coordinates,
    };
    const saveProperty = await Estate.create(property_payload, {
      transaction,
    });

    if (saveProperty) {
      //   await (await transaction).commit();
      await transaction.commit();
      return res.status(200).json({
        success: true,
        message: "Property added successfully",
        saveProperty,
        isExist,
      });
    }
  } catch (err) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      error: `Adding Failed: ${err.message}`,
    });
  }
};

exports.showAll = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  try {
    let data = [];
    let payload = {};
    let retrieval = await Estate.findAll();

    //check if it's empty

    if (retrieval.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No data was retrieved at the moment, Please try again",
      });
    }

    //loop through the estates array

    for (const estates of retrieval) {
      //destructure the contents of the estates
      const {
        id,
        title,
        description,
        from_amount,
        to_amount,
        property_id,
        location,
        coordinates,
        images,
      } = estates;

      payload = {
        id,
        title,
        description,
        from_amount,
        to_amount,
        property_id,
        location,
        coordinates,
        images,
      };
      const Plots = await Plot.findAll({
        where: {
          property_id,
        },
      });

      payload = { ...payload, Plots };
      data.push(payload);

      // retrieval.push(Plots);

      // if (Plots.length === 0) {
      //   console.log("No plots at the moment");
      // } else {
      //   console.log(Plots);
      // }
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.addPlot = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  //destructure the body
  let transaction = await db.sequelize.transaction();

  try {
    const {
      plot_size,
      plot_id,
      value,
      property_id,
      status,
      purchase_order_id,
      customer,
      administator,
    } = req.body;

    const addPlot = await Plot.findOne({
      where: {
        plot_id,
      },
    });

    if (addPlot) {
      throw new Error(" You already have this record");
    }

    const payload = {
      plot_size,
      plot_id,
      value,
      property_id,
      status,
      purchase_order_id,
      customer,
      administator,
    };

    const saveOperation = await Plot.create(payload, { transaction });

    if (saveOperation) {
      await transaction.commit();

      return res.status(200).json({
        success: true,
        message: "Plot have been added successfully",
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
