const userModel = require("../../db/models").User;
const role = require("../../db/models").Role;
const company = require("../../db/models").Company;

const moment = require("moment");
var bcrypt = require("bcryptjs");
const ResponseFormat = require("../../core").ResponseFormat;
const { GoogleSpreadsheet } = require("google-spreadsheet");
const {
  contract_header,
  contracts_waterfall_header,
  segment_header,
} = require("../../enums/connections.enum");

module.exports = {
  /**
   * Companies
   */
  companyUpdate(req, res) {
    return userModel
      .update(
        { companyId: null },
        {
          where: { companyId: req.body.companyId },
        }
      )
      .then(() => {
        console.log("successfully updated company id with null");
      })
      .catch((err) => {
        console.log("update company id err", err);
      })
      .then(() => {
        userModel
          .findAll({
            where: { id: req.body.companyMember },
          })
          .then((users) => {
            for (var i = 0; i < users.length; i++) {
              for (var j = 0; j < req.body.companyMember.length; j++) {
                if (users[i].dataValues.id == req.body.companyMember[j]) {
                  users[i]
                    .update({
                      companyId: req.body.companyId,
                      roleId: req.body.MemberRoles[j],
                    })
                    .then(() => console.log("Successfully updated company", j))
                    .catch((error) =>
                      console.log("Error updated company", error)
                    );
                }
              }
            }

            userModel
              .findAll({
                where: { id: req.body.companyMember },
                include: [
                  {
                    model: role,
                    as: "role",
                  },
                ],
              })
              .then((updated_result) => {
                res
                  .status(201)
                  .json(
                    ResponseFormat.build(
                      updated_result,
                      "Company Create Successfully",
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
                      "Something went wrong when retrieve user",
                      "error"
                    )
                  )
              );
          })
          .catch((error) =>
            res
              .status(400)
              .json(
                ResponseFormat.error(
                  error,
                  "Something went wrong when retrieve user",
                  "error"
                )
              )
          );
      });
  },

  getCompanyList(req, res) {
    return company
      .all()
      .then((companies) =>
        res
          .status(200)
          .json(
            ResponseFormat.build(
              companies,
              "Company Information Reterive successfully",
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

  getCompanyById(req, res) {
    return company
      .findById(req.params.companyId, {
        include: [
          {
            model: userModel,
            as: "users",
            include: [
              {
                model: role,
                as: "role",
              },
            ],
          },
        ],
      })
      .then((companies) =>
        res
          .status(200)
          .json(
            ResponseFormat.build(
              companies,
              "Company Information Reterive successfully",
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

  companyCreate(req, res) {
    return company
      .create({
        companyName: req.body.companyName,
      })
      .then((company) => {
        userModel
          .findAll({
            where: { id: req.body.companyMember },
            include: [
              {
                model: role,
                as: "role",
              },
            ],
          })
          .then((users) => {
            for (var i = 0; i < users.length; i++) {
              for (var j = 0; j < req.body.companyMember.length; j++) {
                if (users[i].dataValues.id == req.body.companyMember[j]) {
                  users[i]
                    .update({
                      companyId: req.body.companyId,
                      companyId: company.id,
                    })
                    .then(() => console.log("Successfully created company", j))
                    .catch((error) =>
                      console.log("Error created company", error)
                    );
                }
              }
            }

            userModel
              .findAll({
                where: { id: req.body.companyMember },
                include: [
                  {
                    model: role,
                    as: "role",
                  },
                ],
              })
              .then((updated_users) => {
                res
                  .status(201)
                  .json(
                    ResponseFormat.build(
                      updated_users,
                      "Company Create Successfully",
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
                      "Something went wrong when retrieve company members",
                      "error"
                    )
                  )
              );
          })
          .catch((error) =>
            res
              .status(400)
              .json(
                ResponseFormat.error(
                  error,
                  "Something went wrong when update members",
                  "error"
                )
              )
          );
      })
      .catch((error) =>
        res
          .status(400)
          .json(
            ResponseFormat.error(
              error,
              "Something went wrong when create Company",
              "error"
            )
          )
      );
  },
};
