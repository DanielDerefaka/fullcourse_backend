const { check } = require("express-validator");

const Router = require("express").Router();

const cart = require("../../controllers/cart");
const userAuth = require("../../middleware/userAuth");

Router.post(
  "/add",
  userAuth,
  check("product_id").notEmpty().withMessage("product_id must not be empty"),
  cart.add
);

Router.get("/showall", userAuth, cart.showAll);

Router.delete(
  "/remove",
  userAuth,
  check("product_id").notEmpty().withMessage("product_id must not be empty"),

  cart.removeCart
);

module.exports = Router;
