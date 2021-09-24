const settingModel = require("../../db/models").Setting;
const sensorLogModel = require("../../db/models").SensorLog;
const role = require("../../db/models").Role;

const moment = require("moment");
var bcrypt = require("bcryptjs");
var request = require("request");

const ResponseFormat = require("../../core").ResponseFormat;
const { GoogleSpreadsheet } = require("google-spreadsheet");

module.exports = {
  /**
   * Settings
   */
  limitSet(req, res) {
    return settingModel
      .update(
        {
          lowLimitVol: req.body.lowLimitVol,
          cautionLimitVol: req.body.cautionLimitVol,
        },
        {
          where: { id: "1" },
        }
      )
      .then((settings) => {
        console.log("successfully updated setting", settings);
      })
      .catch((err) => {
        console.log("update Log Url err", err);
        res
          .status(400)
          .json(
            ResponseFormat.error(
              error,
              "Something went wrong when update Settings",
              "error"
            )
          );
      });
  },

  limitGet(req, res) {
    return settingModel
      .all()
      .then((limitVal) =>
        res
          .status(200)
          .json(
            ResponseFormat.build(
              limitVal,
              "Settings Information Reterive successfully",
              200,
              "success"
            )
          )
      )
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
  logUrlGet(req, res) {
    return settingModel
      .findAll({ attributes: ["logUrl"] })
      .then((logUrlVal) =>
        res
          .status(200)
          .json(
            ResponseFormat.build(
              logUrlVal,
              "Settings Information Reterive successfully",
              200,
              "success"
            )
          )
      )
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
  logDataCheck(req, res) {
    return sensorLogModel
      .findAll()
      .then((logUrlVal) => {
        res
          .status(200)
          .json(
            ResponseFormat.build(
              logUrlVal,
              "Settings Information Reterive successfully",
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
  logUrlRemove(req, res) {
    return settingModel
      .update(
        { logUrl: null },
        {
          where: { id: "1" },
        }
      )
      .then(() => {
        console.log("successfully updated Log Url with null");
      })
      .catch((err) => {
        console.log("update Log Url err", err);
      });
  },
  logUrlAdd(req, res) {
    return settingModel
      .update(
        { logUrl: req.body.logUrl },
        {
          where: { id: "1" },
        }
      )
      .then(() => {
        console.log("successfully added Log Url");
      })
      .catch((err) => {
        console.log("update Log Url err", err);
      });
  },
  loadLogData(req, res) {
    try {
      request.get(
        "https://www.tronicszone.com/wmts/logs.txt",
        async function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var txt = body;
            var line = txt.split("\n");

            var logData = [];
            for (let i = 0; i < line.length; i++) {
              if (line[i].includes("Total") || i >= line.length - 2) continue;
              else {
                let item = {};
                item.includeDate = line[i].split(",")[0];
                item.includeTime = line[i].split(",")[1];
                item.deviceName = line[i].split(",")[2];
                item.macAddress = line[i].split(",")[3];
                item.temp1 = line[i].split(",")[4];
                item.temp2 = line[i].split(",")[5];
                item.voltage = line[i].split(",")[6];
                item.includeDateTime =
                  line[i].split(",")[0] + " " + line[i].split(",")[1];
                logData.push(item);
              }
            }
            console.log("logData is ", logData);
            await sensorLogModel
              .bulkCreate(logData, { returning: true })
              .then(async () => {
                // Notice: There are no arguments here, as of right now you'll have to...
                console.log("successfully added Log Url");
                let data = await sensorLogModel.findAll({
                  limit: 1,
                  order: [["createdAt", "DESC"]],
                });
                res.status(200).send(data);
              });
          }
        }
      );
    } catch (error) {
      res.status(500).send(error);
    }
  },
  removeLogData(req, res) {
    try {
      sensorLogModel.destroy({ truncate: true, cascade: false });
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
