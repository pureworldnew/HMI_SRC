/**
 * /routes/backoffice/connections/index.js
 */
const BackofficeConnectionsRouter = require("express").Router();

BackofficeConnectionsRouter.route("/getActiveSensors").get();

module.exports = BackofficeConnectionsRouter;
