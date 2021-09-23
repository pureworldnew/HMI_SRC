const authRoute = require("./auth.routes");
const adminRoute = require("./admin.routes");
const adminUserRoute = require("./admin").userRoute;
const adminSensorRoute = require("./admin").sensorRoute;
const adminSettingRoute = require("./admin").settingRoute;
const dashboardRoute = require("./dashboard").dashboardRoute;
const revenueRoute = require("./revenue.routes");
const presentationRoute = require("./presentations.routes");
const alertsRoute = require("./alerts.routes");
const reportsRoute = require("./reports.routes");
const accountManagersRoute = require("./accountManagers.routes");

const actionsRoute = require("./actions.route");
const notificationRoute = require("./notifications.routes");

module.exports = {
  authRoute,
  adminRoute,
  adminUserRoute,
  adminSensorRoute,
  adminSettingRoute,
  dashboardRoute,
  revenueRoute,
  presentationRoute,
  alertsRoute,
  reportsRoute,
  accountManagersRoute,
  actionsRoute,
  notificationRoute,
};
