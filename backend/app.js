var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var Sequelize = require("sequelize");
require("dotenv").config();

var app = express();
var cors = require("cors");
// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API is working on..." });
});

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

require("./routes").authRoute(app); // auth - signin, signup
require("./routes").adminRoute(app); // admin
require("./routes").adminUserRoute(app);
require("./routes").adminSensorRoute(app);
require("./routes").adminSettingRoute(app);
require("./routes").dashboardRoute(app);
require("./routes").revenueRoute(app);
require("./routes").presentationRoute(app);
require("./routes").alertsRoute(app);
require("./routes").accountManagersRoute(app);
require("./routes").notificationRoute(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
