"use strict";
module.exports = (sequelize, DataTypes) => {
  const Alerts = sequelize.define(
    "Alerts",
    {
      alertName: DataTypes.STRING,
      frequency: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      recipients: DataTypes.JSON,
    },
    {}
  );
  Alerts.associate = function (models) {
    // associations can be defined here
    // Alerts.hasMany(models.Company, {
    //   foreignKey: "companyId",
    //   as: "companies",
    // });
  };
  return Alerts;
};
