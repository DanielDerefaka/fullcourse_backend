const { check } = require("express-validator");

const route = require("express").Router();

// const Plots = require("../../controllers/Plots");
const Plan = require("../../controllers/plans");

route.post(
  "/add",
  check("property_id").notEmpty().withMessage("property id must not be empty"),
  check("period").notEmpty().withMessage("period must not be empty"),
  check("interest").notEmpty().withMessage("interest must not be empty"),
  check("amount_min").notEmpty().withMessage("amount_min must not be empty"),
  check("amount_max").notEmpty().withMessage("amount_max must not be empty"),

  Plan.new_plan
);

route.get("/", Plan.showAll);

// route.put(
//   "/update",
//   check("property_id").notEmpty().withMessage("This field must not be empty"),
//   Plots.updateProperty
// );

// route.delete(
//   "/destroy",
//   check("property_id").notEmpty().withMessage("This field must not be empty"),

//   Plots.deleteProperty
// );

module.exports = route;
