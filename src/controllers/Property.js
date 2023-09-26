// import db from "../config/sequelize";
const db = require("../config/sequelize");
const fs = require("fs");
const path = require("path");

const imgur = require("imgur");
const {
  j_user,
  PropertyLogs,
  Property,
  j_property,
  j_properties_sub,
  j_properties_sub_cart,
  property_agent,
  j_property_sub_reserve,
} = require("../models");
const { validationResult } = require("express-validator");
const generateID = require("../helpers/generateID");
const { PropertyType } = require("../helpers/Types");
// const j_properties_sub = require("../models/j_properties_sub");

// CRUD OPERATION IS A NECESSITY

//CREATE
exports.addProperty = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    console.log(error.array());

    return res.send({
      error: error.array(),
    });
  }

  //destructure the body
  let transaction = await db.sequelize.transaction();

  let j_transact_id = `P-${generateID(8)}`;
  let saveOperation = null;
  let payload = {};

  try {
    const {
      name,
      // location,
      type,
      kind,
      coordinates,
      description,
      state,
      city,
      address,
      images,
      layout,
      condition,
      furnishing,
      property_size,
      facilities,
      specifications,
      agency_fee,
      agent_ref,
      purchase_type,
      property_type,
      price,
      bedrooms,
      bathrooms,
      availability,
    } = req.body;

    const addMaterial = await j_property.findOne({
      where: {
        j_title: name,
      },
    });

    if (addMaterial) {
      throw new Error(" You already have this record");
    }

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
      //check if agent_ref is not null
      if (!agent_ref) {
        throw new Error("You must provide an agent reference id ");
      }
      //check agent_ref
      const isAgentExist = await property_agent.findOne({
        where: {
          agent_ref,
        },
      });

      if (!isAgentExist) throw new Error("Cannot validate Property Agent ");

      payload = {
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
      data: saveOperation,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.addPropertyBYImageeID = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    console.log(error.array());

    return res.send({
      error: error.array(),
    });
  }

  const { user_id } = req.user;
  //destructure the body
  let transaction = await db.sequelize.transaction();

  let j_transact_id = `P-${generateID(8)}`;
  let saveOperation = null;
  let payload = {};

  try {
    const {
      name,
      // location,
      property_id, //this is the id generated for updating the j_properties
      type,
      kind,
      coordinates,
      description,
      state,
      city,
      address,
      images,
      layout,
      condition,
      furnishing,
      property_size,
      facilities,
      specifications,
      agency_fee,
      // agent_ref,
      purchase_type,
      property_type,
      price,
      bedrooms,
      bathrooms,
      availability,
    } = req.body;

    const user = await property_agent.findOne({
      where: {
        user_id,
      },
    });
    if (!user) {
      throw new Error("User doesn't exist");
    }

    //get the agent_ref from the user object

    const agent_ref = user.agent_ref;

    const addMaterial = await j_property.findOne({
      where: {
        j_title: name,
      },
    });

    if (addMaterial) {
      throw new Error(" You already have this record");
    }

    //check if the transaction ID already exist

    const isExist = await j_property.findOne({
      where: {
        j_transact_id,
      },
    });
    if (isExist) {
      throw new Error("An error occured, please try again");
    }

    //check if agent_ref is not null
    if (!agent_ref) {
      throw new Error("You must provide an agent reference id ");
    }
    //check agent_ref
    const isAgentExist = await property_agent.findOne({
      where: {
        agent_ref,
      },
    });

    if (!isAgentExist) throw new Error("Cannot validate Property Agent ");

    payload = {
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
      j_type: "House",
      j_agent_ref: agent_ref,
      j_purchase_type: purchase_type,
      j_property_type: property_type,
      j_price: price,
      j_bedrooms: bedrooms,
      j_bathrooms: bathrooms,
      j_availability: availability,
      property_id, //this is the id generated for updating the j_properties

      j_admin: "admin", //for debug process only
    };
    saveOperation = await j_property.update(payload, {
      where: {
        j_id: property_id,
      },
      transaction,
    });

    if (!saveOperation) {
      throw new Error("Couldn't complete this transaction");
    }

    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "Property have been added successfully",
      data: saveOperation,
    });
  } catch (error) {
    console.log(error.message);
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
        j_layout,
        j_bedrooms,
        j_bathrooms,
        j_price,

        j_property_type,
        j_agent_ref,
      } = property;
      if (property.j_type === "Land") {
        //fetch the plots associated to this land

        const fetchPlot = await j_properties_sub.findAll({
          where: {
            j_property_id: property.j_id,
          },
        });
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
          dev: "samba",
          plots: fetchPlot,
        };
      }

      if (property.j_type === "House") {
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
          j_layout,
          j_bedrooms,
          j_bathrooms,
          j_price,
          j_property_type,
          j_agent_ref,
        };
      }
      //destructure the contents of the property

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
exports.showPropertyByID = async (req, res) => {
  const error = validationResult(req);
  let data = [];
  let payload = {};

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  const { id } = req.params;

  try {
    const retrieval = await j_property.findOne({
      where: {
        j_id: id,
      },
    });

    if (!retrieval) {
      return res.status(404).json({
        success: false,
        message: "Item does not exist or is not available",
      });
    }

    console.log(retrieval);
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
      j_layout,
      j_bedrooms,
      j_bathrooms,
      j_price,

      j_property_type,
      j_agent_ref,
    } = retrieval;
    if (retrieval.j_type === "Land") {
      //fetch the plots associated to this land

      const fetchPlot = await j_properties_sub.findAll({
        where: {
          j_property_id: retrieval.j_id,
        },
      });
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
        dev: "samba",
        plots: fetchPlot,
      };
    }

    if (retrieval.j_type === "House") {
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
        j_layout,
        j_bedrooms,
        j_bathrooms,
        j_price,
        j_property_type,
        j_agent_ref,
      };
    }

    //check if it's empty

    return res.status(200).json({
      success: true,
      message: "Item retrieved successful",
      data: payload,
    });
  } catch (err) {
    console.log(err.message);
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

  const { user_id } = req.user;

  //destructure the body
  let transaction = await db.sequelize.transaction();

  let j_transact_id = `P-${generateID(8)}`;
  let saveOperation = null;

  try {
    const {
      j_transact_id,
      fullname,
      gender,
      email,
      phoneNo,
      state_of_origin,
      address,
      dob,
      occupation,
    } = req.body;

    //check for the transaction_id in cart

    const existIncart = j_properties_sub_cart.findAll({
      where: {
        j_transact_id,
      },
    });

    if (!existIncart) throw new Error("cannot proceed, reservation error");
    // const reservation = await j_property.findOne({
    //   where: {
    //     j_transact_id: j_transact_id,
    //     j_user_id: user_id,
    //   },
    // });

    // if (reservation) {
    //   throw new Error(" You have already made this reservation");
    // }

    const payload = {
      j_user_id: user_id,
      j_transact_id,
      j_name: fullname,
      j_gender: gender,
      j_email: email,
      j_phone: phoneNo,
      j_state: state_of_origin,
      j_address: address,
      j_dob: dob,
      j_occupation: occupation,
      j_country: "Nigeria",
    };

    saveOperation = await j_property.create(payload, { transaction });

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

exports.addProductImg = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array(),
    });
  }

  const { user_id } = req.user;

  const reqFiles = [];

  const url = req.protocol + "://" + req.get("host");
  try {
    let user = await j_user.findOne({ where: { j_id: user_id } });

    if (user.j_class !== "PROPERTY-AGENT") {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to carry out this operation ",
      });
    }

    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push("/public/" + req.files[i].filename);
    }

    console.log(reqFiles, "maggi");

    const createProduct = await j_property.create({
      j_img: JSON.stringify(reqFiles),
    });

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: " Property Image added successfully",
      id: createProduct.j_id,
      // data: [{ productId: getProductByImg.id }],
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      errors: [{ msg: err.message }],
    });
  }
};
exports.addProductImgBKP = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array(),
    });
  }

  const { user_id } = req.user;

  const reqFiles = [];

  const url = req.get("origin");
  try {
    let user = await j_user.findOne({ where: { j_id: user_id } });

    if (!user) {
      return res.status(200).json({
        success: false,
        statusCode: 300,
        message: "Unknown user",
      });
    }

    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/images/" + req.files[i].filename);
    }

    // check if user class is "PROPERTY-AGENT"

    if (user.j_class !== "PROPERTY-AGENT") {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to carry out this operation ",
      });
    }

    const image1 = req.files.image1;
    const image2 = req.files.image2;
    const image3 = req.files.image3;

    const image_array = [];

    const fileName =
      new Date().getTime().toString() + "A" + path.extname(image1.name);
    const savePath = path.join(__dirname, "..", "dump", "property", fileName);

    const fileName2 =
      new Date().getTime().toString() + "B" + path.extname(image2.name);
    const savePath2 = path.join(__dirname, "..", "dump", "property", fileName2);

    const fileName3 =
      new Date().getTime().toString() + "C" + path.extname(image3.name);
    const savePath3 = path.join(__dirname, "..", "dump", "property", fileName3);

    if (image1.truncated) {
      return res.status(200).json({
        success: false,
        statusCode: 300,
        message: "Image one is too large.",
      });
    }

    if (image2.truncated) {
      return res.status(200).json({
        success: false,
        statusCode: 300,
        message: "Image two is too large.",
      });
    }

    if (image3.truncated) {
      return res.status(200).json({
        success: false,
        statusCode: 300,
        message: "Image three is too large.",
      });
    }

    await image1.mv(savePath);
    await image2.mv(savePath2);
    await image3.mv(savePath3);

    const contents = fs.readFileSync("./dump/property/" + fileName, {
      encoding: "base64",
    });
    const contents2 = fs.readFileSync("./dump/property/" + fileName2, {
      encoding: "base64",
    });
    const contents3 = fs.readFileSync("./dump/property/" + fileName3, {
      encoding: "base64",
    });

    imgur.setClientId("bbbdeab657ad1be");
    imgur.setAPIUrl("https://api.imgur.com/3/");

    var logo = contents.replace(/^data:image\/[a-z]+;base64,/, "");
    var logo2 = contents2.replace(/^data:image\/[a-z]+;base64,/, "");
    var logo3 = contents3.replace(/^data:image\/[a-z]+;base64,/, "");
    // console.log("dsdsd");
    rs_json = await imgur.uploadBase64(logo);
    rs_json2 = await imgur.uploadBase64(logo2);
    rs_json3 = await imgur.uploadBase64(logo3);
    console.log(rs_json);

    console.log(rs_json.link, rs_json2.link, rs_json3.link, "ffff");

    if (rs_json.link) {
      image_array.push(rs_json.link);
    }

    if (rs_json2.link) {
      image_array.push(rs_json2.link);
    }

    if (rs_json3.link) {
      image_array.push(rs_json3.link);
    }

    var filePath = "./dump/property/" + fileName;
    fs.unlinkSync(filePath);

    var filePath2 = "./dump/property/" + fileName2;
    fs.unlinkSync(filePath2);

    var filePath3 = "./dump/property/" + fileName3;
    fs.unlinkSync(filePath3);

    let create = await j_property.create({
      images: image_array,
    });

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: " Property Image added successfully",
      // data: [{ productId: getProductByImg.id }],
    });
  } catch (err) {
    // console.log(` ${err.message} hhhddd`);
    //return  server error response
    res.status(500).json({
      success: false,
      errors: [{ msg: err.message }],
    });
  }
};
