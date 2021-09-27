const db = require("../../db/models");
var moment = require("moment");
const config = require("../../config/auth.config");
const user = db.user;
const role = db.role;
const ResponseFormat = require("../../core").ResponseFormat;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save Temp User to Database... username - New User, roleId
  return User.create({
    userId: req.body.userId,
    fullName: req.body.fullName,
    emailAddress: req.body.email,
    roleId: req.body.roleId,
    password: bcrypt.hashSync(req.body.password, 10),
  })
    .then((user) => {
      res
        .status(201)
        .json(
          ResponseFormat.build(user, "User Create Successfully", 201, "success")
        );
    })
    .catch((error) =>
      res
        .status(400)
        .json(
          ResponseFormat.error(
            error,
            "Something went wrong when create Users",
            "error"
          )
        )
    );
};

exports.signin = (req, res) => {
  console.log("signin function is here");
  // console.log("user model", user);
  user
    .findOne({
      where: { emailAddress: req.body.email },
      include: [
        {
          model: role,
          as: "role",
        },
      ],
    })
    .then((user) => {
      console.log("sdfsdfsdf", user);
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign(
        { id: user.id, roleId: user.roleId },
        config.secret,
        {
          expiresIn: 86400, // 24 hours
        }
      );

      // update last login timestamp
      var dateTime = new Date();
      dateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
      user
        .update({
          lastLogin: dateTime,
        })
        .then(() => console.log("Successfully updated login time", dateTime))
        .catch((error) => console.log("Error updated login time", error));

      res.status(200).send({
        data: user,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
