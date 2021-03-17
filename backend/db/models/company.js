'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    companyName: DataTypes.STRING,
    googleApi: DataTypes.STRING,
    googleSheet: DataTypes.STRING
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
    Company.hasMany(models.User, {foreignKey: 'companyId', as: 'users'});
  };
  return Company;
};