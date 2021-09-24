/**
 * /routes/backoffice/user/index.js
 */
const BackofficeUserRouter = require("express").Router();

BackofficeUserRouter.route("/getActiveSensors").get();

module.exports = BackofficeUserRouter;
