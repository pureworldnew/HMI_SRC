/**
 * /routes/backoffice/index.js
 * @description:: Index file for the BACKOFFICE sub-application. All routes with "/backoffice" come through here.
 */

const BackofficeRouter = require("express").Router();

// Put route handlers here
BackofficeRouter.use("/user", require("./user"));
BackofficeRouter.use("/settings", require("./settings"));
BackofficeRouter.use("/connections", require("./connections"));

module.exports = BackofficeRouter;
