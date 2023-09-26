const { check } = require("express-validator");

const Router = require("express").Router();

const Estates = require("../../controllers/estates");

Router.get("/show", Estates.showAll);

Router.post(
  "/add",
  check("title").notEmpty().withMessage("title must not be empty"),
  check("description").notEmpty().withMessage("description must not be empty"),
  check("from_amount").notEmpty().withMessage("from_amount must not be empty"),
  check("to_amount").notEmpty().withMessage("to_amount must not be empty"),
  check("property_id").notEmpty().withMessage("property_id must not be empty"),
  check("location").notEmpty().withMessage("location must not be empty"),
  check("coordinates").notEmpty().withMessage("coordinates must not be empty"),
  // check("images").notEmpty().withMessage("image must not be empty"),

  Estates.add
);

Router.post(
  "/add/plot",
  check("plot_size").notEmpty().withMessage("plot_size must not be empty"),
  check("plot_id").notEmpty().withMessage("plot_id must not be empty"),
  check("value").notEmpty().withMessage("value must not be empty"),
  check("property_id").notEmpty().withMessage("property_id must not be empty"),
  check("administrator")
    .notEmpty()
    .withMessage("administrator must not be empty"),
  Estates.addPlot
);

Router.post(
  "/add/property",
  check("title").notEmpty().withMessage("title must not be empty"),
  check("description").notEmpty().withMessage("description must not be empty"),
  check("from_amount").notEmpty().withMessage("from_amount must not be empty"),
  check("to_amount").notEmpty().withMessage("to_amount must not be empty"),
  check("property_id").notEmpty().withMessage("property_id must not be empty"),
  check("location").notEmpty().withMessage("location must not be empty"),
  check("images").notEmpty().withMessage("image must not be empty"),

  Estates.add
);
module.exports = Router;
