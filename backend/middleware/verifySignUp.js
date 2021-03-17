const db = require("../db/models");
const User = db.User;

const checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      emailAddress: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return res;
    }

    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;