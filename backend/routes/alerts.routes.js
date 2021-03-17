const { authJwt } = require("../middleware");
const alertsController = require("../controllers").alerts;

module.exports = function (app) {
  // Get all alerts
  app.get("/alerts", alertsController.getAllAlerts);

  // Create new alert
  app.post("/alerts", alertsController.createAlert);

  // Edit alert by id
  app.patch("/alerts/:id", alertsController.editAlertById);

  // Delete alert by id
  app.delete("/alerts/:id", alertsController.deleteAlertById);
};
