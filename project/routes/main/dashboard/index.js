/**
 * /routes/main/dashboard/index.js
 */
const MainDashboardRouter = require("express").Router();
const { authJwt } = require("../../../middleware");
MainDashboardRouter.route("/activeSensors").get(
  [authJwt.verifyToken],
  require("./active-sensors.js")
);

module.exports = MainDashboardRouter;
