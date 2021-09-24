/**
 * /routes/main/notifications/notificationList/
 * @description:: get notifications on notification module
 */
const notificationsController = require("../../../controllers").notifications;

module.exports = notificationsController.getAllNotifications;
