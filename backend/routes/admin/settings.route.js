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
};
