/**
 * /routes/backoffice/settings/index.js
 */
const BackofficeSettingsRouter = require("express").Router();

BackofficeSettingsRouter.route("/getActiveSensors").get();

module.exports = BackofficeSettingsRouter;
