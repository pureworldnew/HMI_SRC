const userModel = require("../../db/models").user;
const role = require("../../db/models").role;

var bcrypt = require("bcryptjs");
const ResponseFormat = require("../../core").ResponseFormat;

module.exports = {
  /**
   * Users
   */
  getUsersList(req, res) {
    let roleId = req.user.roleId;
    let companyId = req.user.companyId;
    console.log("here is test", roleId, companyId);

    if (roleId < 2) {
      // Master or System admin
      return userModel
        .findAll({
          include: [
            {
              model: role,
              as: "role",
            },
          ],
        })
        .then((users) => {
          res
            .status(200)
            .json(
              ResponseFormat.build(
                users,
                "All User Information Reterive successfully",
                200,
                "success"
              )
            );
        })
        .catch((error) =>
          res
            .status(400)
            .send(
              ResponseFormat.build(
                error,
                "Somthing went wrong when Reterieve All User Information",
                400,
                "error"
              )
            )
        );
    }
  },

  getRoleList(req, res) {
    let roleId = req.user.roleId;

    if (roleId < 3) {
      // Master and system admin case
      return role
        .findAll({
          // Master Admin, System Admin, Company Admin
          attributes: [
            ["id", "value"],
            ["roleName", "label"],
          ],
          offset: 0,
          limit: 3,
        })
        .then((roles) => {
          res
            .status(200)
            .json(
              ResponseFormat.build(
                roles,
                "Role List Reterive successfully",
                200,
                "success"
              )
            );
        })
        .catch((error) =>
          res
            .status(400)
            .send(
              ResponseFormat.build(
                error,
                "Somthing went wrong when Reterieve Information",
                400,
                "error"
              )
            )
        );
    } else if (roleId === 3) {
      // Company admin case
      return role
        .findAll({
          // CEO, VP Customer Success, Account Manager, Account Excutive
          attributes: [
            ["id", "value"],
            ["roleName", "label"],
          ],
          offset: 3,
        })
        .then((roles) => {
          res
            .status(200)
            .json(
              ResponseFormat.build(
                roles,
                "Role List Reterive successfully",
                200,
                "success"
              )
            );
        })
        .catch((error) =>
          res
            .status(400)
            .send(
              ResponseFormat.build(
                error,
                "Somthing went wrong when Reterieve Information",
                400,
                "error"
              )
            )
        );
    }
  },

  addNewUser(req, res) {
    let roleId = req.user.roleId; // get user's role id
    let companyId = req.user.companyId; // get user's company id

    if (roleId < 3) {
      // Master and system admin case
      return userModel
        .create({
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
              ResponseFormat.build(
                user,
                "User Create Successfully",
                201,
                "success"
              )
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
    } else if (roleId === 3) {
      // Company admin case
      return userModel
        .create({
          userId: req.body.userId,
          fullName: req.body.fullName,
          emailAddress: req.body.email,
          roleId: req.body.roleId,
          companyId: companyId, // create companyId with company admin's company id
          password: bcrypt.hashSync(req.body.password, 10),
        })
        .then((result) => {
          res
            .status(201)
            .json(
              ResponseFormat.build(
                result,
                "User Create Successfully",
                201,
                "success"
              )
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
    }
  },

  getAllUserList(req, res) {
    return userModel
      .findAll({
        include: ["role"],
      })
      .then((users) =>
        res
          .status(200)
          .json(
            ResponseFormat.build(
              users,
              "User Information Reterive successfully",
              200,
              "success"
            )
          )
      )
      .catch((error) =>
        res
          .status(400)
          .send(
            ResponseFormat.build(
              error,
              "Somthing went wrong when Reterieve Information",
              400,
              "error"
            )
          )
      );
  },
};
