const Route = require("express").Router();

const { Router } = require("express");
const { check } = require("express-validator");
const materials = require("../../controllers/materials");
const { upload } = require("../../helpers/multer");
const adminAuth = require("../../middleware/adminAuth");
const userAuth = require("../../middleware/userAuth");

Route.post(
  "/add",

  upload.single("image"),
  adminAuth,
  check("item_name").notEmpty().withMessage("item_name must not be empty"),
  check("category").notEmpty().withMessage("category must not be empty"),
  check("quantity").notEmpty().withMessage("quantity must not be empty"),
  check("supplier_ref")
    .notEmpty()
    .withMessage("supplier_ref must not be empty"),

  check("amount")
    .notEmpty()
    .withMessage("amount must not be empty")
    .isNumeric()
    .withMessage("must be a number"),
  check("discount")
    .notEmpty()
    .withMessage("discount must not be empty")
    .isNumeric()
    .withMessage("Must be numeric value"),
  check("product_details")
    .notEmpty()
    .withMessage("product_details must not be empty"),

  check("product_description")
    .notEmpty()
    .withMessage("product_description must not be empty"),
  check("tags").notEmpty().withMessage("tags must not be empty"),
  materials.addBuildingMaterials
);

Route.get("/all", materials.showAll);
Route.get("/itemByID/:id", materials.showByID);

Route.put("/update", materials.updateMaterial);
Route.delete("/destroy", materials.deleteMaterial);

module.exports = Route;
