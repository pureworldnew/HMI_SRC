const authRoute = require("./auth.routes");
const adminRoute = require("./admin.routes");
const adminUserRoute = require("./admin").userRoute;
const adminSensorRoute = require("./admin").sensorRoute;
const adminSettingRoute = require("./admin").settingRoute;
const revenueRoute = require("./revenue.routes");
const presentationRoute = require("./presentations.routes");
const alertsRoute = require("./alerts.routes");
const reportsRoute = require("./reports.routes");
const accountManagersRoute = require("./accountManagers.routes");

module.exports = {
  authRoute,
  adminRoute,
  adminUserRoute,
  adminSensorRoute,
  adminSettingRoute,
  revenueRoute,
  presentationRoute,
  alertsRoute,
  reportsRoute,
  accountManagersRoute,
};
