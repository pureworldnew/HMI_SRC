const { authJwt } = require("../middleware");
const reportsController = require("../controllers").reports;

module.exports = function (app) {
  // Get all reports
  app.get("/report", reportsController.getAllReports);

  // Create new report
  app.post("/report", reportsController.createReport);

  // Edit report by id
  app.patch("/report/:id", reportsController.editReportById);

  // Delete report by id
  app.delete("/report/:id", reportsController.deleteReportById);
};
