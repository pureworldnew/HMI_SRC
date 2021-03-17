'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: DataTypes.STRING,
    fullName: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    password: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
    lastLogin: DataTypes.STRING,
    avatarUrl: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
    User.belongsToMany(models.Team, { through: 'teamuser', foreignKey: 'userId', as: 'team' });
    User.belongsTo(models.Company, { foreignKey: 'companyId', as: 'companies' });
  };
  return User;
};