const sensorLog = require("../../db/models").SensorLog;
const db = require("../../db/models");
const ResponseFormat = require("../../core").ResponseFormat;

module.exports = {
  getActiveSensors(req, res) {
    return db.sequelize
      .query(
        "SELECT includeDate, includeTime, COUNT(id) as activeSensor FROM sensorlogs GROUP BY includeDate, includeTime ORDER BY includeDate DESC, includeTime DESC LIMIT 1",
        {
          type: db.sequelize.QueryTypes.SELECT,
        }
      )
      .then(function (recentActive) {
        res
          .status(200)
          .json(
            ResponseFormat.build(
              recentActive,
              "Company Information Reterive successfully",
              200,
              "success"
            )
          );
      })
      .catch((error) =>
        res
          .status(400)
          .send(
            ResponseFormat.build(
              error,
              "Somthing went wrong when Reterieve Information",
              400,
              "error"
            )
          )
      );
  },
};
