const user = require("../db/models").User;
const role = require("../db/models").Role;
const alerts = require("../db/models").Alerts;
const AlertsService = require("../services/alerts");
const ResponseFormat = require("../core").ResponseFormat;

module.exports = {
  async getAllAlerts(req, res) {
    try {
      const data = await alerts.findAll();
      res
        .status(201)
        .json(ResponseFormat.build(data, "Get all alerts", 201, "success"));
    } catch (e) {
      res
        .code(500)
        .json(ResponseFormat.build(e, "Internal server error", 500, "error"));
    }
  },
  async createAlert(req, res) {
    const { alertName, frequency, recipients } = req.body;

    const status = true;
    try {
      const alert = await alerts.create({
        alertName,
        frequency,
        recipients,
        status,
      });
      res
        .status(201)
        .json(
          ResponseFormat.build(alert, "Alert has been created", 201, "success")
        );
    } catch (e) {
      res
        .status(500)
        .json(ResponseFormat.build(e, "Internal server error", 500, "error"));
    }
  },
  async editAlertById(req, res) {
    const { id } = req.params;
    const { body } = req;
    if (!id) {
      return res.json(
        ResponseFormat.build([], "Params is empty", 400, "error")
      );
    }
    try {
      await alerts.update({ ...body }, { where: { id } });
      const editAlert = await alerts.findById(id);
      if (!editAlert) {
        return res
          .status(201)
          .json(
            ResponseFormat.build(
              [],
              "Alert by this ID doesn't exists",
              400,
              "error"
            )
          );
      }
      res
        .status(201)
        .json(
          ResponseFormat.build(
            editAlert,
            "Alert has been updated",
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
  async deleteAlertById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.json(
        ResponseFormat.build([], "Params is empty", 201, "error")
      );
    }

    try {
      const alert = await alerts.findById(id);
      if (!alert) {
        return res
          .status(201)
          .json(
            ResponseFormat.build(
              [],
              "Alert by this ID doesn't exists",
              400,
              "error"
            )
          );
      }
      await alert.destroy();
      res
        .status(201)
        .json(
          ResponseFormat.build(null, "Alert has been deleted", 201, "success")
        );
    } catch (e) {
      res
        .code(500)
        .json(ResponseFormat.build(e, "Internal server error", 500, "error"));
    }
  },
};
