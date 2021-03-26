const { authJwt, verifySignUp } = require("../../middleware");
const dashboardController = require("../../controllers").dashboard;

module.exports = function (app) {
  /**
   * Sensors routes
   */
  app.get(
    "/dashboard/getActiveSensors",
    [authJwt.verifyToken],
    dashboardController.getActiveSensors
  );
};
