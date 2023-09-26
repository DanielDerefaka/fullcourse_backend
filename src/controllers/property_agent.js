// import db from "../config/sequelize";
const db = require("../config/sequelize");
const { property_agent } = require("../models");
const { validationResult } = require("express-validator");
const generateID = require("../helpers/generateID");

//READ
exports.showAll = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  try {
    const retrieval = await property_agent.findAll();

    //check if it's empty

    if (retrieval.length > 0) {
    }

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

//CREATE
exports.addAgent = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  //get the admin info from the  middleware

  const { user_id } = req.admin;

  //destructure the body
  let transaction = await db.sequelize.transaction();

  try {
    const { name, email, url } = req.body;

    const supplierNameExist = await property_agent.findOne({
      where: {
        name,
      },
    });

    const supplierEmailExist = await property_agent.findOne({
      where: {
        email,
      },
    });

    if (supplierEmailExist || supplierNameExist) {
      throw new Error(" You already have this record");
    }

    //get item_id using the first 2 characters of item name and first 2 charaters of category
    let agent_ref = `${name.substring(0, 4).trim().toUpperCase()}-${generateID(
      7
    )}`;
    const payload = {
      name,
      email,
      agent_ref,
      url,
      status: 2,
      administrator: user_id,
    };

    const saveOperation = await property_agent.create(payload, {
      transaction,
    });

    if (saveOperation) {
      await transaction.commit();

      return res.status(200).json({
        success: true,
        message: "Agent have been added successfully",
        data: saveOperation,
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

//UPDATE
exports.updateSupplierInfo = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  // this controller is designed to update the property data

  const {
    item_name,
    item_id,
    category,
    availability,
    quantity,
    amount,
    currency,
    discount,
    product_description,
    product_details,
    tags,
  } = req.body;

  //check if property exist
  try {
    const isExist = await Material.findOne({
      where: {
        item_id,
      },
    });

    if (!isExist) {
      return res.status(400).json({
        success: false,
        message: "This material doesn't exist",
      });
    }

    //proceed to update the data
    const update = Material.update(
      {
        item_name,
        category,
        availability,
        quantity,
        amount,
        currency,
        discount,
        product_description,
        product_details,
        tags,
      },
      {
        where: {
          item_id,
        },
      }
    );

    if (!update) {
      throw new Error("cannot proceed");
    }

    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      update,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// DELETE

exports.removeSupplier = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  const { item_id } = req.body;

  //check if the property exist

  try {
    const isExist = await Material.findOne({
      where: {
        item_id,
      },
    });

    if (!isExist) {
      throw new Error("No record exist ");
    }

    const deleteProperty = await Material.destroy({
      where: {
        item_id,
      },
    });

    if (deleteProperty !== 1) {
      throw new Error("Operation failed, contact support");
    }

    return res.status(200).json({
      success: true,
      message: "Data have been deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.verify_property_agent_status = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  const { user_id } = req.user;

  try {
    //fetch the property agent profile using the user id

    const fetchProfile = await property_agent.findOne({
      where: {
        user_id,
      },
    });

    if (!fetchProfile) {
      console.log("you dont have a business profile");
      return res.status(404).json({
        success: false,
        message:
          "User doesn't have a Business profile, Please contact support team",
      });
    }

    //destructure the fetchProfile

    const { name, email, url, status, agent_ref } = fetchProfile;

    if (!name || !url || !email || !agent_ref) {
      console.log("you have not completed");
      return res.status(200).json({
        success: false,
        message: "You have not completed your business profile",
        errCode: 303,
      });
    }

    if (status !== "verified") {
      console.log("you are not verified");

      return res.status(200).json({
        success: false,
        errCode: 301,
        message: "You are not verified",
      });
    }

    console.log("it is done");

    return res.status(200).json({
      success: true,
      message: "User is verified",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
