const { check } = require("express-validator");

const Router = require("express").Router();

const PropertyCart = require("../../controllers/property_cart");
const userAuth = require("../../middleware/userAuth");

Router.post(
  "/add",
  check("property_sub_id").notEmpty().withMessage("This field cannot be empty"),
  userAuth,

  PropertyCart.addCart
);

module.exports = Router;
