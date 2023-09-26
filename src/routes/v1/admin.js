const { check } = require("express-validator");

const Router = require("express").Router();

const Admin = require("../../controllers/admin");

Router.get("/", (req, res) => {
  res.send({
    success: true,
  });
});

Router.post(
  "/register",
  check("email").notEmpty().withMessage("email must not be empty"),
  check("firstName").notEmpty().withMessage("field must not be empty"),
  check("lastName").notEmpty().withMessage("field must not be empty"),
  check("phoneNumber").notEmpty().withMessage("phone must not be empty"),
  check("password").notEmpty().withMessage("password must not be empty"),
  Admin.register
);

Router.post(
  "/login",
  check("email").notEmpty().withMessage("email must not be empty"),
  check("password").notEmpty().withMessage("password must not be empty"),
  Admin.login
);

Router.get("/retrieve/all", Admin.retrieveAllUsers);

Router.get("/verify", Admin.verifyJWT);

module.exports = Router;
