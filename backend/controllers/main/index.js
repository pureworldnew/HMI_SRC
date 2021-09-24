const auth = require("./auth.controller");
const dashboard = require("./dashboard.controller");
const notifications = require("./notifications.controller");
const sensors = require("./sensors.controller");

module.exports = {
  sensors,
  notifications,
  dashboard,
  auth,
};
