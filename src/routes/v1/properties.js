const { check } = require("express-validator");

const Router = require("express").Router();

const Property = require("../../controllers/Property");
const userAuth = require("../../middleware/userAuth");
const { upload } = require("../../multer/init");

Router.use("/plots", require("./plots"));
Router.use("/agent", require("./property_agent"));
Router.use("/cart", require("./property_cart"));

Router.post(
  "/add",
  check("name").notEmpty().withMessage("name must not be empty"),
  check("type").notEmpty().withMessage("type must not be empty"),
  // check("state").notEmpty().withMessage("state must not be empty"),
  // check("coordinates").notEmpty().withMessage("coordinates must not be empty"),
  // check("agent_ref").notEmpty().withMessage("agent_ref must not be empty"),
  check("purchase_type")
    .notEmpty()
    .withMessage("purchase_type must not be empty"),
  check("address").notEmpty().withMessage("address must not be empty"),
  Property.addProperty
);
Router.put(
  "/complete",

  userAuth,
  check("property_id").notEmpty().withMessage("property_id must not be empty"),

  Property.addPropertyBYImageeID
);

Router.get("/", Property.showAll);

Router.post(
  "/upload/image",
  upload.array("imgCollection", 3),
  userAuth,
  Property.addProductImg
);
Router.get("/:id", Property.showPropertyByID);

Router.put(
  "/update",
  check("property_id").notEmpty().withMessage("This field must not be empty"),
  Property.updateProperty
);

Router.delete(
  "/destroy",
  check("property_id").notEmpty().withMessage("This field must not be empty"),

  Property.deleteProperty
);
module.exports = Router;
