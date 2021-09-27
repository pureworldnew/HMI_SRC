/**
 * /routes/backoffice/connections/index.js
 */
const BackofficeConnectionsRouter = require("express").Router();
const { authJwt } = require("../../../middleware");

BackofficeConnectionsRouter.route("/logUrl")
  .get([authJwt.verifyToken], require("./get-log-url.js"))
  .post([authJwt.verifyToken], require("./set-log-url.js"))
  .delete([authJwt.verifyToken], require("./remove-log-data.js"));

BackofficeConnectionsRouter.route("/checkLogTable").get(
  [authJwt.verifyToken],
  require("./check-log-table.js")
);

BackofficeConnectionsRouter.route("/logData")
  .post([authJwt.verifyToken], require("./load-log-data.js"))
  .delete([authJwt.verifyToken], require("./remove-log-data.js"));

module.exports = BackofficeConnectionsRouter;
