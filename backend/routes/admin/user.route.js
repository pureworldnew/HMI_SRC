const { authJwt, verifySignUp } = require("../../middleware");
const adminController = require("../../controllers").admin;
const userController = require("../../controllers").users;

module.exports = function (app) {
  /**
   * Users routes
   */
  app.get(
    "/admin/users/getUsersList",
    [authJwt.verifyToken],
    userController.getUsersList
  );
  app.get(
    "/admin/users/getRoleList",
    [authJwt.verifyToken],
    adminController.getRoleList
  );
  app.post(
    "/admin/users/addNewUser",
    [verifySignUp.checkDuplicateEmail, authJwt.verifyToken],
    adminController.addNewUser
  );
};
