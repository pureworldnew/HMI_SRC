const admin = require("./admin.controller");
const auth = require("./auth.controller");
const revenueContracts = require("./revenue/contract.controller");
const revenueInsights = require("./revenue/insights.controller");
const presentations = require("./presentation.controller");
const alerts = require("./alerts.controller");
const sensors = require("./admin/sensor.controller");
const users = require("./admin/users.controller");

module.exports = {
  admin,
  sensors,
  users,
  auth,

  revenueContracts,
  revenueInsights,

  presentations,
  alerts,
};
