const reports = require("../db/models").Reports;
const ResponseFormat = require("../core").ResponseFormat;

module.exports = {
  async getAllReports(req, res) {
    try {
      const data = await alerts.findAll();
      res
        .status(201)
        .json(ResponseFormat.build(data, "Get all reports", 201, "success"));
    } catch (e) {
      res
        .code(500)
        .json(ResponseFormat.build(e, "Internal server error", 500, "error"));
    }
  },
  async createReport(req, res) {
    const { alertName, frequency, recipients } = req.body;
    const status = true;
    try {
      const reports = await reports.create({
        alertName,
        frequency,
        recipients,
        status,
      });
      res
        .status(201)
        .json(
          ResponseFormat.build(alert, "Report has been created", 201, "success")
        );
    } catch (e) {
      res
        .status(500)
        .json(ResponseFormat.build(e, "Internal server error", 500, "error"));
    }
  },
  async editReportById(req, res) {
    const { id } = req.params;
    const { body } = req;
    if (!id) {
      return res.json(
        ResponseFormat.build([], "Params is empty", 400, "error")
      );
    }
    try {
      await reports.update({ ...body }, { where: { id } });
      const editReport = await reports.findById(id);
      if (!editReport) {
        return res
          .status(201)
          .json(
            ResponseFormat.build(
              [],
              "Report by this ID doesn't exists",
              400,
              "error"
            )
          );
      }
      res
        .status(201)
        .json(
          ResponseFormat.build(
            editReport,
            "Report has been updated",
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
  async deleteReportById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.json(
        ResponseFormat.build([], "Params is empty", 201, "error")
      );
    }

    try {
      const reports = await reports.findById(id);
      if (!reports) {
        return res
          .status(201)
          .json(
            ResponseFormat.build(
              [],
              "Report by this ID doesn't exists",
              400,
              "error"
            )
          );
      }
      await reports.destroy();
      res
        .status(201)
        .json(
          ResponseFormat.build(null, "Report has been deleted", 201, "success")
        );
    } catch (e) {
      res
        .code(500)
        .json(ResponseFormat.build(e, "Internal server error", 500, "error"));
    }
  },
};
