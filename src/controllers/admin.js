// import db from "../config/sequelize";
const db = require("../config/sequelize");
const { User, j_admin } = require("../models");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const uuid = require("uuid").v4;
const jwt = require("jsonwebtoken");

// const loan = require("../../../models/loan");
// import { lend } from '../../web3/web.controller';

exports.register = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(401).json({
      error: error.array(),
    });
  }
  let t; //sequelize transaction

  try {
    t = await db.sequelize.transaction();
    const { email, password, firstName, lastName, phoneNumber, role } =
      req.body;

    const user = await j_admin.findOne({
      where: { email },
    });
    if (user) {
      throw new Error("User already exists with same email");
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.SALTROUNDS));
    const reqPass = bcrypt.hashSync(password, parseInt(salt));
    const rCode = Math.floor(1000 + Math.random() * 9000);
    const payload = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      role: role || 3,
      password: reqPass,
      status: 1,
      //   verifyToken: rCode,
    };

    const newUser = await j_admin.create(payload, { transaction: t });
    if (newUser) {
      //   var dynamic_template_data = {
      //     code: rCode,
      //     subject: "Hollox Finance Email Verification",
      //     name: payload.firstName + ", " + payload.lastName,
      //   };
      //   sendTemplate(
      //     payload.email,
      //     process.env.FROM,
      //     process.env.EMAILVERIFICATION_TEMPLATE_ID,
      //     dynamic_template_data
      //   );
      await t.commit();
      return res.status(200).json({
        success: true,
        message: "User added successfully",
      });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      success: false,
      message: "Failed to create user: " + error.message,
    });
  }
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
    const user = await j_admin.findOne({
      where: { email },
    });

    console.log(user);
    if (!user) {
      throw new Error("Incorrect credentials");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Password is incorrect");
    }

    if (user.status !== "APPROVED") {
      throw new Error("ADMIN is not verified");
    }

    const token = jwt.sign(
      {
        admin: {
          user_id: user.id,
          email: user.email,
          role: user.role,
          createdAt: new Date(),
        },
      },
      process.env.SECRET_ADMIN
    );

    delete user.dataValues.j_password;
    return res.status(200).json({
      success: true,
      message: "Admin Login was successful",
      token,
      user,
    });
  } catch (error) {
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
    const AllUsers = await j_admin.findAll();

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

exports.verifyJWT = async (req, res, next) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_ADMIN);
    // req.admin = decoded.admin;
    // next();

    return res.status(200).json({
      success: true,
      user: decoded.admin,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Cannot verify user token",
    });
  }
};
