/**
 * routes/index.js
 */
module.exports = function (app) {
  app.use("/api/main", require("./main"));
  app.use("/api/backoffice", require("./backoffice"));
  app.use("/api/api", require("./api"));
};
