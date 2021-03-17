const { authJwt, verifySignUp } = require("../middleware");
const adminController = require('../controllers').admin


module.exports = function (app) {

  /**
   * Users routes
   */
  app.get("/admin/users/getUsersList", [authJwt.verifyToken], adminController.getUsersList);
  app.get("/admin/users/getRoleList", [authJwt.verifyToken], adminController.getRoleList);
  app.post("/admin/users/addNewUser", [verifySignUp.checkDuplicateEmail, authJwt.verifyToken], adminController.addNewUser);

  /**
   * Companys routes
   */
  app.get('/admin/companys/getAllUserList', [authJwt.verifyToken], adminController.getAllUserList);
  app.post('/admin/companys/companyCreate', [authJwt.verifyToken], adminController.companyCreate);
  app.get('/admin/companys/getCompanyList', [authJwt.verifyToken], adminController.getCompanyList);
  app.get('/admin/companys/getCompanyById/:companyId', [authJwt.verifyToken], adminController.getCompanyById);
  app.post('/admin/companys/companyUpdate', [authJwt.verifyToken], adminController.companyUpdate);

  /**
   * Connnections routes
   */
  app.post('/admin/connections/updateApi', [authJwt.verifyToken], adminController.updateApi);
  app.post('/admin/connections/insertGoogleSheet', [authJwt.verifyToken], adminController.insertGoogleSheet)
  app.get('/admin/connections/removeGoogleSheet/:companyId', [authJwt.verifyToken], adminController.removeGoogleSheet)
  app.post('/admin/connections/updateGoogleSheet', [authJwt.verifyToken], adminController.updateGoogleSheet)

};
