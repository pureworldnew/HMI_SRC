/**
 * /routes/main/notifications/notificationList/
 * @description:: get notifications on notification module
 */
const notificationsController =
  require("../../../controllers/main").notifications;

module.exports = notificationsController.getAllNotifications;
