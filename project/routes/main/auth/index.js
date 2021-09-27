/**
 * /routes/main/auth/index.js
 */
const MainAuthRouter = require("express").Router();
const { verifySignUp } = require("../../../middleware");

MainAuthRouter.route("/textproxy").get(require("./getTextProxy.js"));

MainAuthRouter.route("/signin").post(require("./signin.js"));
MainAuthRouter.route("/signup").post(
  [verifySignUp.checkDuplicateEmail],
  require("./signup.js")
);

module.exports = MainAuthRouter;
