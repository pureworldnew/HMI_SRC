const { authJwt, verifySignUp } = require("../../middleware");
const settingsController = require("../../controllers").settings;

module.exports = function (app) {
  /**
   * Settings routes
   */
  app.post(
    "/admin/settings/limitSet",
    [authJwt.verifyToken],
    settingsController.limitSet
  );
  app.get(
    "/admin/settings/getLimit",
    [authJwt.verifyToken],
    settingsController.limitGet
  );
  app.get(
    "/admin/settings/getLogUrl",
    [authJwt.verifyToken],
    settingsController.logUrlGet
  );
  app.get(
    "/admin/settings/checkLogTable",
    [authJwt.verifyToken],
    settingsController.logDataCheck
  );
  app.delete(
    "/admin/settings/removeLogUrl",
    [authJwt.verifyToken],
    settingsController.logUrlRemove
  );
  app.post(
    "/admin/settings/addLogUrl",
    [authJwt.verifyToken],
    settingsController.logUrlAdd
  );
  app.post(
    "/admin/settings/loadLogData",
    [authJwt.verifyToken],
    settingsController.loadLogData
  );
};
