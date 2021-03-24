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

  companyCreate(req, res) {
    return company
      .create({
        companyName: req.body.companyName,
      })
      .then((company) => {})
      .catch((error) =>
        res
          .status(400)
          .json(
            ResponseFormat.error(
              error,
              "Something went wrong when create Company",
              "error"
            )
          )
      );
  },
};
