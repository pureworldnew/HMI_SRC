const settingModel = require("../../db/models").Setting;
const role = require("../../db/models").Role;

const moment = require("moment");
var bcrypt = require("bcryptjs");
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
        console.log("update company id err", err);
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
};
