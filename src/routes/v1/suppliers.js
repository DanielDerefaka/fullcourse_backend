const Route = require("express").Router();

const { Router } = require("express");
const { check } = require("express-validator");
// const materials = require("../../controllers/materials");
const suppliers = require("../../controllers/supplier");
const adminAuth = require("../../middleware/adminAuth");
const userAuth = require("../../middleware/userAuth");

Route.post(
  "/add",
  adminAuth,
  check("name").notEmpty().withMessage("name must not be empty"),
  check("email").notEmpty().withMessage("email must not be empty"),
  check("address").notEmpty().withMessage("address must not be empty"),
  check("phoneNumber").notEmpty().withMessage("phoneNumber must not be empty"),

  suppliers.addSupplier
);

Route.get(
  "/status",
  userAuth,
  suppliers.verify_supplier_status
);

Route.get("/", suppliers.showAll);

Route.get("/verify", userAuth, suppliers.verify_supplier_status);
// Route.put("/update", materials.updateMaterial);
// Route.delete("/destroy", materials.deleteMaterial);

module.exports = Route;
