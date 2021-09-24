/**
 * /routes/main/notifications/index.js
 */
const MainNotificationRouter = require("express").Router();

MainNotificationRouter.route("/getActiveSensors").get();

module.exports = MainNotificationRouter;
