const { authJwt, verifySignUp } = require("../middleware");
const adminController = require("../controllers").admin;
const userController = require("../controllers").users;

module.exports = function (app) {
  /**
   * Companys routes
   */
  app.get(
    "/admin/companys/getAllUserList",
    [authJwt.verifyToken],
    adminController.getAllUserList
  );
  app.post(
    "/admin/companys/companyCreate",
    [authJwt.verifyToken],
    adminController.companyCreate
  );
  app.get(
    "/admin/companys/getCompanyList",
    [authJwt.verifyToken],
    adminController.getCompanyList
  );
  app.get(
    "/admin/companys/getCompanyById/:companyId",
    [authJwt.verifyToken],
    adminController.getCompanyById
  );
  app.post(
    "/admin/companys/companyUpdate",
    [authJwt.verifyToken],
    adminController.companyUpdate
  );

  /**
   * Connnections routes
   */
  app.post(
    "/admin/connections/updateApi",
    [authJwt.verifyToken],
    adminController.updateApi
  );
  app.post(
    "/admin/connections/insertGoogleSheet",
    [authJwt.verifyToken],
    adminController.insertGoogleSheet
  );
  app.get(
    "/admin/connections/removeGoogleSheet/:companyId",
    [authJwt.verifyToken],
    adminController.removeGoogleSheet
  );
  app.post(
    "/admin/connections/updateGoogleSheet",
    [authJwt.verifyToken],
    adminController.updateGoogleSheet
  );

  
};
