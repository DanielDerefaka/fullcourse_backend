const Route = require("express").Router();

const { Router } = require("express");
const { check } = require("express-validator");
// const materials = require("../../controllers/materials");
const wallet = require("../../controllers/wallet");
const userAuth = require("../../middleware/userAuth");

Route.get("/balance", userAuth, wallet.balance);
Route.post(
  "/topup",
  userAuth,
  check("amount").notEmpty().withMessage("amount must not be empty"),

  wallet.topup
);

// Router.get("/", userAuth, wallet.balance);
module.exports = Route;
