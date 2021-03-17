const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../db/models");
const User = db.User;
const Role = db.Role;

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log("token decode error: ", err)
      // return res.status(401).send({
      //   message: "Token is not valid!"
      // });
      res.redirect('/')
    }
    req.user = decoded;
    next();
  });

};


const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;
