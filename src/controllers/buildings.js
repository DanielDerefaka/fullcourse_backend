// import db from "../config/sequelize";
const db = require("../config/sequelize");
const { Building } = require("../models");
const { validationResult } = require("express-validator");

// exports.showAll = async (req, res) => {
//   const error = validationResult(req);

//   if (!error.isEmpty()) {
//     return res.send({
//       error: error.array(),
//     });
//   }

//   try {
//     const retrieval = await Material.findAll();

//     //check if it's empty

//     if (retrieval.length > 0) {
//     }

//     return res.status(200).json({
//       success: true,
//       data: retrieval,
//     });

//     return retrieval;
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };

// exports.addBuildingMaterials = async (req, res) => {
//   const error = validationResult(req);

//   if (!error.isEmpty()) {
//     return res.send({
//       error: error.array(),
//     });
//   }

//   //destructure the body
//   let transaction = await db.sequelize.transaction();

//   try {
//     const {
//       name,
//       description,
//       amount,
//       image,
//       staff_id,
//       discount,
//       product_status,
//     } = req.body;

//     const addMaterial = await Material.findOne({
//       where: {
//         name,
//       },
//     });

//     if (addMaterial) {
//       throw new Error(" You already have this record");
//     }

//     const payload = {
//       name,
//       description,
//       amount,
//       image,
//       staff_id,
//       discount,
//       product_status,
//     };

//     const saveOperation = await Material.create(payload, { transaction });

//     if (saveOperation) {
//       await transaction.commit();

//       return res.status(200).json({
//         success: true,
//         message: "Data have been added successfully",
//       });
//     }
//   } catch (error) {
//     await transaction.rollback();
//     return res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

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
  } = req.body;
  try {
    const isExist = await Estate.findOne({
      where: {
        title,
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
    const retrieval = await Estate.findAll();

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
