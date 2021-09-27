/**
 * /routes/main/notifications/index.js
 */
const MainNotificationRouter = require("express").Router();
const { authJwt } = require("../../../middleware");
MainNotificationRouter.route("/notificationList")
  .get([authJwt.verifyToken], require("./notification-list.js"))
  .post([authJwt.verifyToken], require("./notification-create.js"));

module.exports = MainNotificationRouter;
