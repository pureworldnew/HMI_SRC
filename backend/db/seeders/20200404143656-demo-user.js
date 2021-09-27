"use strict";
var bcrypt = require("bcryptjs");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        userId: "Master Admin",
        fullName: "Admin Full Name",
        emailAddress: "admin@gmail.com",
        password: bcrypt.hashSync("admin", 10),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
