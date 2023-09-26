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
    const retrieval = await Material.findAll();

    //check if it's empty

    if (retrieval.length > 0) {
    }

    return res.status(200).json({
      success: true,
      data: retrieval,
    });

    return retrieval;
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//READ
exports.showByID = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  const { id } = req.params;

  try {
    const retrieval = await Material.findOne({
      where: {
        id,
      },
    });

    if (!retrieval) {
      return res.status(404).json({
        success: false,
        message: "Item does not exist or is not available",
      });
    }

    //check if it's empty

    return res.status(200).json({
      success: true,
      message: "Item retrieved successful",
      data: retrieval,
    });

    return retrieval;
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//UPDATE
exports.updateMaterial = async (req, res) => {
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

exports.deleteMaterial = async (req, res) => {
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

//ADD ITEM
exports.addProduct = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  //get the admin info from the  middleware

  const { user_id } = req.user;

  //destructure the body
  let transaction = await db.sequelize.transaction();
  let item_identify = "";
  if (!req.file) {
    transaction.rollback();
    return res.status(400).send({
      error: "you have not added any image",
    });
  }

  try {
    console.log(req.file);
    // const { image } = req.file;

    const {
      item_name,
      category,
      quantity,
      amount,
      discount,
      product_details,
      product_description,
      supplier_ref,
      tags,
    } = req.body;

    const user = j_user.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User is not authentic",
      });
    }

    //CHECK IF USER ROLE  IS EQUAL TO VENDOR

    if (user.j_class !== "VENDOR") {
      return res.status(400).json({
        status: false,
        message: "Function is restricted to vendors only",
      });
    }

    //continue

    const addMaterial = await Material.findOne({
      where: {
        item_name,
      },
    });

    if (addMaterial) {
      throw new Error(" You already have this record");
    }

    //check supplier reference

    const confirmSupplier = await material_supplier.findOne({
      where: {
        supplier_ref,
      },
    });
    if (!confirmSupplier) {
      throw new Error("Supplier doesn't exist");
    }
    //get item_id using the first 2 characters of item name and first 2 charaters of category
    item_identify = `${item_name.substring(0, 2).toUpperCase()}-${category(
      0,
      2
    ).toUpperCase()}-${generateID(9).toUpperCase()}`;
    const payload = {
      item_name,
      category,
      availability: 1,
      quantity,
      amount,
      currency: "NGN",
      discount,
      product_details,
      product_description,
      uploaded_by: user_id,
      supplier_ref,
      item_id: item_identify,
      tags,
      image: req.file.path,
    };

    const saveOperation = await Material.create(payload, { transaction });

    if (!saveOperation) {
      transaction.rollback();

      return res.status(400).json({
        success: false,
        message: "Couldn't complete operation",
        image,
      });
    }
    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "Material have been added successfully",
      image,
    });
  } catch (error) {
    transaction.rollback();
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
