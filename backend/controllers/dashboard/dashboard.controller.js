const sensorLog = require("../../db/models").SensorLog;
const db = require("../../db/models");
const ResponseFormat = require("../../core").ResponseFormat;

module.exports = {
  getActiveSensors(req, res) {
    return db.sequelize
      .query(
        "SELECT macAddress, temp1, temp2, voltage, MAX(includeDateTime) AS includeDateTime, deviceName FROM sensorlogs GROUP BY deviceName ORDER BY MAX(includeDateTime)",
        {
          type: db.sequelize.QueryTypes.SELECT,
        }
      )
      .then(function (activeSensors) {
        res
          .status(200)
          .json(
            ResponseFormat.build(
              activeSensors,
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
