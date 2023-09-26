const Route = require("express").Router();

Route.use("/materials", require("./materials"));
Route.use("/suppliers", require("./suppliers"));
Route.use("/cart", require("./cart"));

Route.use("/property", require("./properties"));

module.exports = Route;
