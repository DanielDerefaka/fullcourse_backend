const { check } = require("express-validator");

const route = require("express").Router();

const Plots = require("../../controllers/Plots");

route.post(
  "/add",
  check("property_id").notEmpty().withMessage("property_id must not be empty"),
  check("type").notEmpty().withMessage("type must not be empty"),
  check("title").notEmpty().withMessage("title must not be empty"),
  check("amount").notEmpty().withMessage("amount must not be empty"),
  check("period").notEmpty().withMessage("period must not be empty"),
  // check("plot_no").notEmpty().withMessage("plot_no must not be empty"),
  check("desc").notEmpty().withMessage("desc must not be empty"),
  // check("state").notEmpty().withMessage("state must not be empty"),
  // check("city").notEmpty().withMessage("city must not be empty"),
  // check("address").notEmpty().withMessage("address must not be empty"),
  check("img").notEmpty().withMessage("img must not be empty"),

  Plots.new_plot
);

// route.get("/all", Plots.showAll);

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
