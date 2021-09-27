/**
 * /routes/backoffice/user/index.js
 */
const BackofficeUserRouter = require("express").Router();
const { authJwt } = require("../../../middleware");

BackofficeUserRouter.route("/getRoleList").get(
  [authJwt.verifyToken],
  require("./get-role-list.js")
);

BackofficeUserRouter.route("/getUserList").get(
  [authJwt.verifyToken],
  require("./get-user-list.js")
);

BackofficeUserRouter.route("/addNewUser").post(
  [authJwt.verifyToken],
  require("./add-new-user.js")
);


module.exports = BackofficeUserRouter;
