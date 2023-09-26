    const Router = require("express").Router();
const Payments = require("../../controllers/Payments");
const adminAuth = require("../../middleware/adminAuth");
const userAuth = require("../../middleware/userAuth");

Router.use("/plan", require("./plan"));
// Router.use("/plots", require("./plots"));
Router.post("/init", userAuth, Payments.newPayment);

Router.get("/all", adminAuth, Payments.showAllPayment);

Router.get("/user/all", userAuth, Payments.showPaymentForUser);
module.exports = Router;
