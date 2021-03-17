const authRoute = require("./auth.routes");
const adminRoute = require("./admin.routes");
const revenueRoute = require("./revenue.routes");
const presentationRoute = require("./presentations.routes");
const alertsRoute = require("./alerts.routes");
const reportsRoute = require("./reports.routes");
const accountManagersRoute = require("./accountManagers.routes");

module.exports = {
  authRoute,
  adminRoute,
  revenueRoute,
  presentationRoute,
  alertsRoute,
  reportsRoute,
  accountManagersRoute
};
