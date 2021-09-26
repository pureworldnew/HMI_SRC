/**
 * routes/index.js
 */
module.exports = function (app) {
  app.use("/main", require("./main"));
  app.use("/backoffice", require("./backoffice"));
  app.use("/api", require("./api"));
};
