// import db from "../config/sequelize";
const db = require("../config/sequelize");
const { j_properties_sub_cart, j_properties_sub } = require("../models");
const { validationResult } = require("express-validator");
const generateID = require("../helpers/generateID");
const { PropertyType } = require("../helpers/Types");
// const j_properties_sub = require("../models/j_properties_sub");

// CRUD OPERATION IS A NECESSITY

//CREATE
exports.addCart = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  const { user_id } = req.user;
  //destructure the body
  let transaction = await db.sequelize.transaction();

  try {
    const { property_sub_id } = req.body;

    const allCart = await j_properties_sub_cart.findAll();

    //check if property_sub_id exist

    const isPropertySubExist = await j_properties_sub_cart.findOne({
      where: {
        j_property_sub_id: property_sub_id,
      },
    });

    if (isPropertySubExist)
      throw new Error("You have already added this item to cart");

    const property_sub = await j_properties_sub.findOne({
      where: {
        j_id: property_sub_id,
      },
    });

    if (!property_sub) throw new Error("Cannot resolve the property");

    //desctructure

    const {
      j_property_id,
      j_title,
      j_amount,
      j_p_no,
      j_country,
      j_state,
      j_city,
      j_address,
    } = property_sub;

    // populate the data in to the cart
    let j_transact_id = `P-${allCart.length}-${Date.now()}`;

    const payload = {
      j_user_id: user_id,
      j_transact_id,
      j_property_sub_id: property_sub_id,
      j_property_id,
      j_p_no,
      j_title,
      j_qty: 1,
      j_currency: "NGN",
      j_amount,
      j_date: new Date(),
      j_status: 0,
      j_country,
      j_state,
      j_city,
      j_address,
    };

    const populate = await j_properties_sub_cart.create(payload, {
      transaction,
    });

    if (!populate) throw new Error("Process not successful, rolling back");

    await transaction.commit();
    return res.status(200).json({
      success: true,
      message: "Property have been added successfully",
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      status: false,
      message: error.message,
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
    let retrieval = await j_property.findAll();

    //check if it's empty

    if (retrieval.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No data was retrieved at the moment, Please try again",
      });
    }

    //loop through the estates array

    for (const property of retrieval) {
      //destructure the contents of the property
      const {
        j_id,
        j_transact_id,
        j_type,
        j_kind,
        j_cordinates,
        j_title,
        j_desc,
        j_country,
        j_state,
        j_city,
        j_address,
        j_img,
      } = property;

      payload = {
        j_id,
        j_transact_id,
        j_type,
        j_kind,
        j_cordinates,
        j_title,
        j_desc,
        j_country,
        j_state,
        j_city,
        j_address,
        j_img,
      };
      const Plots = await j_properties_sub.findAll({
        where: {
          j_property_id: j_id,
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

//READ
// exports.showAll = async (req, res) => {
//   const error = validationResult(req);

//   if (!error.isEmpty()) {
//     return res.send({
//       error: error.array(),
//     });
//   }

//   try {
//     const retrieval = await j_property.findAll();

//     //check if it's empty

//     if (retrieval.length > 0) {
//     }

//     return res.status(200).json({
//       success: true,
//       data: retrieval,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };

//UPDATE
exports.updateProperty = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  // this controller is designed to update the property data

  const {
    name,
    property_id,
    location,
    coordinates,
    property_address,
    condition,
    subType,
    furnishing,
    property_size,
    facilities,
    specifications,
    agency_fee,
    region,
    images,
    property_type,
    price,
    bedrooms,
    bathrooms,
    availability,
  } = req.body;

  //check if property exist
  try {
    const isExist = await Property.findOne({
      where: {
        property_id,
      },
    });

    if (!isExist) {
      return res.status(400).json({
        success: false,
        message: "This property doesn't exist",
      });
    }

    //proceed to update the data
    const update = Property.update(
      {
        name,
        location,
        coordinates,
        property_address,
        condition,
        subType,
        furnishing,
        property_size,
        facilities,
        specifications,
        agency_fee,
        region,
        images,
        property_type,
        price,
        bedrooms,
        bathrooms,
        availability,
      },
      {
        where: {
          property_id,
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

// //UPDATE
// exports.updateProperty = async (req, res) => {
//   const error = validationResult(req);

//   if (!error.isEmpty()) {
//     return res.send({
//       error: error.array(),
//     });
//   }

//   // this controller is designed to update the property data

//   const {
//     name,
//     property_id,
//     location,
//     coordinates,
//     property_address,
//     condition,
//     subType,
//     furnishing,
//     property_size,
//     facilities,
//     specifications,
//     agency_fee,
//     region,
//     images,
//     property_type,
//     price,
//     bedrooms,
//     bathrooms,
//     availability,
//   } = req.body;

//   //check if property exist
//   try {
//     const isExist = await Property.findOne({
//       where: {
//         property_id,
//       },
//     });

//     if (!isExist) {
//       return res.status(400).json({
//         success: false,
//         message: "This property doesn't exist",
//       });
//     }

//     //proceed to update the data
//     const update = Property.update(
//       {
//         name,
//         location,
//         coordinates,
//         property_address,
//         condition,
//         subType,
//         furnishing,
//         property_size,
//         facilities,
//         specifications,
//         agency_fee,
//         region,
//         images,
//         property_type,
//         price,
//         bedrooms,
//         bathrooms,
//         availability,
//       },
//       {
//         where: {
//           property_id,
//         },
//       }
//     );

//     if (!update) {
//       throw new Error("cannot proceed");
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Updated successfully",
//       update,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };

// DELETE

exports.deleteProperty = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  const { property_id } = req.body;

  //check if the property exist

  try {
    const isExist = await Property.findOne({
      where: {
        property_id,
      },
    });

    if (!isExist) {
      throw new Error("No record exist ");
    }

    const deleteProperty = await Property.destroy({
      where: {
        property_id,
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

exports.makeReservation = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  //destructure the body
  let transaction = await db.sequelize.transaction();

  let j_transact_id = `P-${generateID(8)}`;
  let saveOperation = null;

  try {
    const { j_transact_id } = req.body;

    const addMaterial = await j_property.findOne({
      where: {
        j_title: name,
      },
    });

    if (addMaterial) {
      throw new Error(" You already have this record");
    }

    //check agent_ref
    const isAgentExist = await property_agent.findOne({
      where: {
        agent_ref,
      },
    });

    if (!isAgentExist) throw new Error("Cannot validate Property Agent ");
    //check if the transaction ID already exist

    const isExist = await j_property.findOne({
      where: {
        j_transact_id,
      },
    });
    if (isExist) {
      throw new Error("An error occured, please try again");
    }

    if (type === PropertyType.land) {
      const payload = {
        j_title: name,
        j_country: "NIGERIA",
        j_state: state,
        j_city: city,
        j_transact_id,
        j_type: type,
        j_kind: kind,
        j_cordinates: coordinates,
        j_desc: description,
        j_status: 1,
        j_layout: layout,
        j_date: new Date(),
        j_img: images,
        j_address: address,
        j_admin: "admin", //for debug process only
      };
      saveOperation = await j_property.create(payload, { transaction });
    } else if (type === PropertyType.house) {
      const payload = {
        j_title: name,
        j_country: "NIGERIA",
        j_state: state,
        j_city: city,
        j_transact_id,
        j_type: type,
        j_kind: 2,
        j_cordinates: coordinates,
        j_desc: description,
        j_status: 1,
        j_layout: layout,
        j_date: new Date(),
        j_img: images,
        j_address: address,
        j_condition: condition,
        j_furnishing: furnishing,
        j_property_size: property_size,
        j_facilities: facilities,
        j_specifications: specifications,
        j_agency_fee: agency_fee,

        j_agent_ref: agent_ref,
        j_purchase_type: purchase_type,
        j_property_type: property_type,
        j_price: price,
        j_bedrooms: bedrooms,
        j_bathrooms: bathrooms,
        j_availability: availability,
        j_admin: "admin", //for debug process only
      };
      saveOperation = await j_property.create(payload, { transaction });
    } else throw new Error("illegal option selected");

    if (!saveOperation) {
      throw new Error("Couldn't complete this transaction");
    }

    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "Property have been added successfully",
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
