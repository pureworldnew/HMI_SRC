/**
 * /routes/backoffice/settings/index.js
 */
const BackofficeSettingsRouter = require("express").Router();
const { authJwt } = require("../../../middleware");

BackofficeSettingsRouter.route("/limit")
  .get([authJwt.verifyToken], require("./get-limit.js"))
  .post([authJwt.verifyToken], require("./set-limit.js"));

module.exports = BackofficeSettingsRouter;
