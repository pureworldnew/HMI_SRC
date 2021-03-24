const { authJwt, verifySignUp } = require("../../middleware");
const sensorController = require("../../controllers").sensors;

module.exports = function (app) {
  /**
   * Sensors routes
   */
  app.post(
    "/admin/sensors/sensorCreate",
    [authJwt.verifyToken],
    sensorController.companyCreate
  );
  app.get(
    "/admin/sensors/getSensorList",
    [authJwt.verifyToken],
    sensorController.getCompanyList
  );
};
