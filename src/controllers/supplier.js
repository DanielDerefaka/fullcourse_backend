// import db from "../config/sequelize";
const db = require("../config/sequelize");
const { Material, material_supplier, j_user } = require("../models");
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
    const retrieval = await material_supplier.findAll();

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
exports.addSupplier = async (req, res) => {
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
    const { name, email, phoneNumber, address } = req.body;

    const supplierNameExist = await material_supplier.findOne({
      where: {
        name,
      },
    });

    const supplierEmailExist = await material_supplier.findOne({
      where: {
        email,
      },
    });

    if (supplierEmailExist || supplierNameExist) {
      throw new Error(" You already have this record");
    }

    //get item_id using the first 2 characters of item name and first 2 charaters of category
    let supplier_ref = `${name
      .substring(0, 3)
      .trim()
      .toUpperCase()}-${generateID(7)}`;
    const payload = {
      name,
      email,
      supplier_ref,
      address,
      phoneNumber,
      administrator: user_id,
    };

    const saveOperation = await material_supplier.create(payload, {
      transaction,
    });

    if (saveOperation) {
      await transaction.commit();

      return res.status(200).json({
        success: true,
        message: "Supplier have been added successfully",
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

exports.verify_supplier_status = async (req, res) => {
  const { user_id } = req.user;
  try {
    const verify_user = await j_user.findOne({
      where: {
        j_id: user_id,
      },
    });

    if (!verify_user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const {} = verify_user;

    const userBusinessProfile = await material_supplier.findOne({
      where: {
        user_id,
      },
    });

    if (!userBusinessProfile) {
      return res.status(400).json({
        success: false,
        errCode: 305,
        message: "user doesn't have a businesss profile",
        
      });
    }

    const { name, address, supplier_ref, email, phoneNumber, isVerified } =
      userBusinessProfile;

    if (!name || !address || !supplier_ref || !email || !phoneNumber) {
      return res.status(400).json({
        success: false,
        errCode: 301,
        message: "User have not completed business profile",
      });
    }

    if (isVerified !== "VERIFIED") {
      return res.status(400).json({
        success: false,
        errCode: 303,
        message: "User is not verified, COntact support",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user is okay",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



