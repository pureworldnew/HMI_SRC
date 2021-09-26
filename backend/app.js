var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var Sequelize = require("sequelize");
require("dotenv").config();

const db = require("./db/models");
var moment = require("moment");
const config = require("./config/auth.config");
const User = db.User;
const Role = db.Role;
const ResponseFormat = require("./core").ResponseFormat;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var app = express();
var cors = require("cors");
// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// app.get("/main/auth/textproxy", (req, res) => {
//   res.json({ message: "API is working on..." });
// });

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// app.post("/main/auth/postRequest", (req, res) => {
//   console.log("main/auth/postRequest", req.body);
//   res.send("main/auth/postRequest is working");
// });

// app.post("/main/auth/signin/", (req, res) => {
//   console.log("req", req.body);
//   User.findOne({
//     where: { emailAddress: req.body.email },
//     include: [
//       {
//         model: Role,
//         as: "role",
//       },
//     ],
//   })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }

//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );

//       if (!passwordIsValid) {
//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!",
//         });
//       }

//       var token = jwt.sign(
//         { id: user.id, roleId: user.roleId },
//         config.secret,
//         {
//           expiresIn: 86400, // 24 hours
//         }
//       );

//       // update last login timestamp
//       var dateTime = new Date();
//       dateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
//       user
//         .update({
//           lastLogin: dateTime,
//         })
//         .then(() => console.log("Successfully updated login time", dateTime))
//         .catch((error) => console.log("Error updated login time", error));

//       res.status(200).send({
//         data: user,
//         accessToken: token,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// });

require("./routes")(app);

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
