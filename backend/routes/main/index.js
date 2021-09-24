/**
 * /routes/main/index.js
 * @description:: Index file for the MAIN sub-application. All routes with "/main" come through here.
 */

const MainRouter = require("express").Router();

// Put route handlers here
MainRouter.use("/dashboard", require("./dashboard"));
MainRouter.use("/notifcations", require("./dashboard"));
MainRouter.use("/sensors", require("./sensors"));

module.exports = MainRouter;
