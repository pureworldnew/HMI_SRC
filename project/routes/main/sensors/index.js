/**
 * /routes/main/sensors/index.js
 */
const MainSensorsRouter = require("express").Router();
const { authJwt } = require("../../../middleware");
MainSensorsRouter.route("/sensorsList").get(
  [authJwt.verifyToken],
  require("./sensors-list.js")
);

module.exports = MainSensorsRouter;
