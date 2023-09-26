// import db from "../config/sequelize";
const db = require("../config/sequelize");
const { j_properties_sub, j_property } = require("../models");
const { validationResult } = require("express-validator");

exports.new_plot = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  //destructure the body
  let transaction = await db.sequelize.transaction();
  let plot_number = "";

  //check for possible duplicate transaction id

  try {
    const {
      property_id,
      type,
      title,
      amount,
      period,
      plot_no,
      desc,

      img,
    } = req.body;

    //gather information for the plot from the property_id

    const Property = await j_property.findOne({
      where: {
        j_id: property_id,
      },
    });

    if (!Property) {
      throw new Error("The property does not exist");
    }

    // const addMaterial = await j_properties_sub.findOne({
    //   where: {
    //     j_p_no: plot_no,
    //   },
    // });

    // if (addMaterial) {
    //   throw new Error(" You already have this record");
    // }

    //destructure property items
    const { j_country, j_state, j_city, j_address, j_title } = Property;

    //split the title to form the plot number

    let titleArray = j_title.split(" ");
    //loop through the titlearray

    titleArray.forEach((element) => {
      console.log(element);
      plot_number = plot_number + element.substring(0, 2) + "-".toUpperCase();
    });

    //get the total number of plots available and append
    const plotsAvailable = await j_properties_sub.findAll({
      where: {
        j_property_id: property_id,
      },
    });

    console.log(plotsAvailable);
    plot_number = (
      plot_number + parseInt(plotsAvailable.length + 1)
    ).toUpperCase();

    console.log(plot_number.toUpperCase());
    const payload = {
      j_title: title,
      j_property_id: property_id,
      j_type: type,
      j_amount: amount,
      j_period: period,
      j_qty: 1,
      j_p_no: plot_number,
      j_desc: desc,
      j_country,
      j_state,
      j_city,
      j_address,
      j_img: img,
      j_date: new Date(),
      j_status: 1,
      j_admin: "admin", // this is for development, id will be gotten from middle ware
    };

    const saveOperation = await j_properties_sub.create(payload, {
      transaction,
    });

    if (saveOperation) {
      await transaction.commit();

      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Data have been added successfully",
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

exports.update_plan = (req, res) => {};

exports.show_plans = async (req, res) => {};
