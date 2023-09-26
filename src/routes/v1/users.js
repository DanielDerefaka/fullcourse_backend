const { check } = require("express-validator");

const Router = require("express").Router();

const User = require("../../controllers/users");

const userAuth = require("../../middleware/userAuth");
const Route = require("./wallet");

Router.use("/wallet", require("./wallet"));

Router.get("/", (req, res) => {
  res.send({
    success: true,
  });
});

Router.post(
  "/register",
  check("email").notEmpty().withMessage("email must not be empty"),
  // check("firstName").notEmpty().withMessage("field must not be empty"),
  // check("lastName").notEmpty().withMessage("field must not be empty"),
  // check("username").notEmpty().withMessage("username must not be empty"),
  // check("phoneNumber").notEmpty().withMessage("phone must not be empty"),
  check("password").notEmpty().withMessage("password must not be empty"),
  check("userClass").notEmpty().withMessage("user class must not be empty"),

  User.register
);

Router.post(
  "/login",
  check("email").notEmpty().withMessage("email must not be empty"),
  check("password").notEmpty().withMessage("password must not be empty"),
  User.login
);

Router.get("/retrieve/all", User.retrieveAllUsers);

Router.post(
  "/verify/otp",
  check("otp").notEmpty().withMessage("otp must not be empty"),
  check("email").notEmpty().withMessage("email must not be empty"),
  // userAuth,
  User.verifyOtp
);

Router.get("/verify", userAuth, User.verifyJWT);

module.exports = Router;
