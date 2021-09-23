const { authJwt } = require("../middleware");
const notificationsController = require("../controllers").notifications;

module.exports = function (app) {
  // Get all notifications
  app.get("/notifications", notificationsController.getAllNotifications);

  // Create new notification
  app.post("/notifications", notificationsController.createNotification);

  // Edit notification by id
  app.patch("/notifications/:id", notificationsController.editNotificationById);

  // Delete notification by id
  app.delete(
    "/notifications/:id",
    notificationsController.deleteNotificationById
  );
};
