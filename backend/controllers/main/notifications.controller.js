const user = require("../../db/models").User;
const role = require("../../db/models").Role;
const notifications = require("../../db/models").Notification;
const ResponseFormat = require("../../core").ResponseFormat;

module.exports = {
  async getAllNotifications(req, res) {
    try {
      const data = await notifications.findAll();
      res
        .status(201)
        .json(
          ResponseFormat.build(data, "Get all notifications", 201, "success")
        );
    } catch (e) {
      res
        .code(500)
        .json(ResponseFormat.build(e, "Internal server error", 500, "error"));
    }
  },
  async createNotification(req, res) {
    const reqBody = req.body;
    console.log(req.body);
    const trigger_temperature = reqBody.trigger.temperature;
    console.log(trigger_temperature);
    const trigger_temperature_condition = reqBody.trigger.temperatureCondition;
    const trigger_temperature_unit = reqBody.trigger.temperatureUnit;
    const settings_subject = reqBody.settings.subject;
    const settings_message = reqBody.settings.message.bodyText;
    const settings_user_id = reqBody.settings.user.userId;
    const extra_acknowledgeMode = reqBody.settings.extra.acknowledgeMode;
    const extra_smsMessage = reqBody.settings.extra.smsMessage;
    const extra_snoozeMode = reqBody.settings.extra.snoozeMode;
    const extra_snoozePeriod = reqBody.settings.extra.snoozePeriod;
    const extra_voiceText = reqBody.settings.extra.voiceText;
    const action_name = reqBody.actionName;
    const sensor_id =
      reqBody.sensorsList.length === 0 ? 1 : reqBody.sensorsList["0"];

    try {
      const notification = await notifications.create({
        trigger_temperature,
        trigger_temperature_condition,
        trigger_temperature_unit,
        settings_subject,
        settings_message,
        settings_user_id,
        extra_acknowledgeMode,
        extra_smsMessage,
        extra_snoozeMode,
        extra_snoozePeriod,
        extra_voiceText,
        action_name,
        sensor_id,
      });
      res
        .status(201)
        .json(
          ResponseFormat.build(
            notification,
            "Notification has been created",
            201,
            "success"
          )
        );
    } catch (e) {
      res
        .status(500)
        .json(ResponseFormat.build(e, "Internal server error", 500, "error"));
    }
  },
  async editNotificationById(req, res) {
    const { id } = req.params;
    const { body } = req;
    if (!id) {
      return res.json(
        ResponseFormat.build([], "Params is empty", 400, "error")
      );
    }
    try {
      await notifications.update({ ...body }, { where: { id } });
      const editNotification = await notifications.findById(id);
      if (!editNotification) {
        return res
          .status(201)
          .json(
            ResponseFormat.build(
              [],
              "Notification by this ID doesn't exists",
              400,
              "error"
            )
          );
      }
      res
        .status(201)
        .json(
          ResponseFormat.build(
            editNotification,
            "Notification has been updated",
            201,
            "success"
          )
        );
    } catch (e) {
      res
        .code(500)
        .json(ResponseFormat.build(e, "Internal server error", 500, "error"));
    }
  },
  async deleteNotificationById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.json(
        ResponseFormat.build([], "Params is empty", 201, "error")
      );
    }

    try {
      const notification = await notifications.findById(id);
      if (!notification) {
        return res
          .status(201)
          .json(
            ResponseFormat.build(
              [],
              "Notification by this ID doesn't exists",
              400,
              "error"
            )
          );
      }
      await notification.destroy();
      res
        .status(201)
        .json(
          ResponseFormat.build(
            null,
            "Notification has been deleted",
            201,
            "success"
          )
        );
    } catch (e) {
      res
        .code(500)
        .json(ResponseFormat.build(e, "Internal server error", 500, "error"));
    }
  },
};
