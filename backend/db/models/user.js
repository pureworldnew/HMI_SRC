"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: DataTypes.STRING,
      fullName: DataTypes.STRING,
      emailAddress: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      lastLogin: DataTypes.STRING,
      avatarUrl: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.Role, { foreignKey: "roleId", as: "role" });
  };
  return User;
};
