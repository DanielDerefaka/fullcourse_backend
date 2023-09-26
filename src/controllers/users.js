// import db from "../config/sequelize";
const db = require("../config/sequelize");
const {
  j_user,
  material_supplier,
  wallet,
  property_agent,
} = require("../models");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const uuid = require("uuid").v4;
const jwt = require("jsonwebtoken");
const generateID = require("../helpers/generateID");
const { UserClass } = require("../helpers/Types");
const { encryption } = require("../encryption/encrypt");
const { sendEmail } = require("../mailgun/email-util");

// const loan = require("../../../models/loan");
// import { lend } from '../../web3/web.controller';

// exports.register = async (req, res) => {
//   const error = validationResult(req);
//   if (!error.isEmpty()) {
//     return res.status(401).json({
//       error: error.array(),
//     });
//   }
//   let t; //sequelize transaction

//   try {
//     t = await db.sequelize.transaction();
//     const {
//       email,
//       password,
//       firstName,
//       lastName,
//       username,
//       phoneNumber,
//       referrer_id,
//       userClass,
//     } = req.body;

//     const user = await j_user.findOne({
//       where: { j_email: email },
//     });
//     if (user) {
//       throw new Error("User already exists with same email");
//     }

//     const isUsername = await j_user.findOne({
//       where: { j_username: username },
//     });
//     if (isUsername) {
//       throw new Error("username taken");
//     }

//     const salt = await bcrypt.genSalt(parseInt(process.env.SALTROUNDS));
//     const reqPass = bcrypt.hashSync(password, parseInt(salt));
//     const rCode = Math.floor(1000 + Math.random() * 9000);

//     //check for user class

//     // if (userClass === UserClass.supplier) {
//     //   const response = isSupplier({
//     //     firstName,
//     //   });
//     // }

//     const payload = {
//       j_email: email,
//       j_firstname: firstName,
//       j_lastname: lastName,
//       j_username: username,
//       j_phone: phoneNumber,
//       j_referrer_id: referrer_id,
//       j_password: reqPass,
//       j_status: 2,
//       j_otp: generateID(4),
//       j_class: userClass,
//     };

//     const newUser = await j_user.create(payload, { transaction: t });

//     const createWallet = await wallet.create({
//       user_id: newUser.j_id,
//       balance: encryption(0),
//       ledger: encryption(0),
//       status: "active",
//     });

//     if (!newUser || !createWallet) {
//       await t.rollback();
//       return res.status(200).json({
//         success: false,
//         message: "cannot complete",
//       });
//     }

//     await t.commit();
//     return res.status(200).json({
//       success: true,
//       message: "User added successfully",
//     });
//   } catch (error) {
//     await t.rollback();
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create user: " + error.message,
//     });
//   }
// };

exports.register = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error.array());
    return res.status(400).json({
      error: error.array(),
    });
  }
  let t; //sequelize transaction

  try {
    t = await db.sequelize.transaction();
    const {
      email,
      password,
      firstName,
      lastName,
      username,
      phoneNumber,
      referrer_id,
      userClass,
    } = req.body;

    const user = await j_user.findOne({
      where: { j_email: email },
    });
    if (user) {
      throw new Error("User already exists with same email");
    }

    // const isUsername = await j_user.findOne({
    //   where: { j_username: username },
    // });
    // if (isUsername) {
    //   throw new Error("username taken");
    // }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALTROUNDS));
    const reqPass = bcrypt.hashSync(password, parseInt(salt));
    const rCode = Math.floor(1000 + Math.random() * 9000);

    //check for user class

    const otp = generateID(4);

    const payload = {
      j_email: email,
      j_firstname: firstName,
      j_lastname: lastName,
      // j_username: username,
      j_phone: phoneNumber,
      j_referrer_id: referrer_id,
      j_password: reqPass,
      j_status: 2,
      j_otp: otp,
      j_class: userClass,
    };

    const newUser = await j_user.create(payload, { transaction: t });

    if (userClass === UserClass.property_agent) {
      //ADD THE USER RECORD IN THE PROPERTY AGENT
      const AddPropertyAgentRecord = await property_agent.create({
        user_id: newUser.j_id,
      });
    }

    if (userClass === UserClass.supplier) {
      //ADD THE USER RECORD IN THE PROPERTY AGENT
      const AddPropertyAgentRecord = await material_supplier.create({
        user_id: newUser.j_id,
      });
    }

    const createWallet = await wallet.create({
      user_id: newUser.j_id,
      balance: encryption(0),
      ledger: encryption(0),
      status: "active",
    });

    if (!newUser || !createWallet) {
      await t.rollback();
      return res.status(200).json({
        success: false,
        message: "cannot complete",
      });
    }

    //send email to the customer
    await sendEmail(email, {
      subject: "Capital City: Registration successful",
      text: `WELCOME TO CAPITAL CITY, USE THIS CODE TO VERIFY YOUR ACCOUNT ${otp}`,
    });

    await t.commit();
    return res.status(200).json({
      success: true,
      message: "User added successfully",
    });
  } catch (error) {
    console.log(error.message);
    await t.rollback();
    return res.status(500).json({
      success: false,
      message: "Failed to create user: " + error.message,
    });
  }
};

const isPropertyAgent = async (data) => {
  // const supplierNameExist = await property_agent.findOne({
  //   where: {
  //     name: data.,
  //   },
  // });

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
};
const isSupplier = async (data) => {
  // //get item_id using the first 2 characters of item name and first 2 charaters of category
  // let supplier_ref = `${data.firstName
  //   .substring(0, 3)
  //   .trim()
  //   .toUpperCase()}-${generateID(7)}`;
  // const payload = {
  //   email,
  //   supplier_ref,
  //   address,
  //   phoneNumber,
  //   administrator: user_id,
  // };
  // const saveOperation = await material_supplier.create(payload, {
  //   transaction,
  // });
  // if (saveOperation) {
  //   await transaction.commit();
  //   return res.status(200).json({
  //     success: true,
  //     message: "Supplier have been added successfully",
  //   });
  // }
};

exports.login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }
  const { email, password } = req.body;
  try {
    const user = await j_user.findOne({
      where: { j_email: email.trim() },
    });
    if (!user) {
      throw new Error("Incorrect credentials");
    }
    const match = await bcrypt.compare(password, user.j_password);
    if (!match) {
      throw new Error("Password is incorrect");
    }

    // if (user.j_status !== "ACTIVE") {
    //   throw new Error("User is not verified");
    // }

    const token = jwt.sign(
      {
        user: {
          user_id: user.j_id,
          email: user.j_email,
          status: user.j_status,
          createdAt: new Date(),
        },
      },
      process.env.SECRET
    );

    delete user.dataValues.j_password;
    return res.status(200).json({
      success: true,
      message: "Login was successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.retrieveAllUsers = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  try {
    const AllUsers = await j_user.findAll();

    return res.status(200).json({
      success: true,
      count: AllUsers.length,
      users: AllUsers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  const { otp, email } = req.body;

  const transaction = db.sequelize.transaction();
  try {
    //get user infor
    const user = await j_user.findOne({
      where: {
        j_email: email,
      },
    });
    console.log(user);

    if (!user) {
      throw new Error("User doesn't exist ");
    }

    // if (user.j_status !== 2) {
    //   throw new Error("User account is already verified");
    // }
    if (otp !== user.j_otp) {
      throw new Error("Incorrect OTP ");
    }

    // //change the status of the user

    if (user.j_status === "ACTIVE") throw new Error("already verified");

    const update = await j_user.update(
      {
        j_status: "ACTIVE",
      },
      {
        where: {
          j_email: email,
        },
        // transaction,
      }
    );
    (await transaction).commit();
    return res.status(200).json({
      success: true,
      message: "Verification successful",
    });
  } catch (error) {
    (await transaction).rollback();
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.verifyJWT = async (req, res) => {
  const { user_id } = req.user;
  try {
    let user = await j_user.findOne({ where: { j_id: user_id } });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User not found." }] });
    }

    res.status(200).send({
      user: user,
      data: user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      errors: [{ msg: "internal error" }],
    });
  }
};
