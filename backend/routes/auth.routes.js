const { verifySignUp } = require("../middleware");
const authController = require("../controllers").auth;

module.exports = function (app) {
  app.post("/auth/signup", [verifySignUp.checkDuplicateEmail], authController.signup);
  app.post("/auth/signin", authController.signin);
};
