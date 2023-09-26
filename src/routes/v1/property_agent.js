const Route = require("express").Router();

const { Router } = require("express");
const { check } = require("express-validator");
// const materials = require("../../controllers/materials");
const suppliers = require("../../controllers/supplier");
const agent = require("../../controllers/property_agent");
const adminAuth = require("../../middleware/adminAuth");
const userAuth = require("../../middleware/userAuth");

Route.post(
  "/add",
  adminAuth,
  check("name").notEmpty().withMessage("name must not be empty"),
  check("email").notEmpty().withMessage("email must not be empty"),
  check("url").notEmpty().withMessage("url must not be empty"),

  agent.addAgent
);

Route.get("/", agent.showAll);
Route.get("/status", userAuth, agent.verify_property_agent_status);

// Route.put("/update", materials.updateMaterial);
// Route.delete("/destroy", materials.deleteMaterial);

module.exports = Route;
