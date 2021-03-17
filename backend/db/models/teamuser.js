'use strict';
module.exports = (sequelize, DataTypes) => {
  const teamuser = sequelize.define('teamuser', {
    teamId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  teamuser.associate = function (models) {
    // associations can be defined here
    teamuser.belongsTo(models.Team, { foreignKey: 'teamId' });
    teamuser.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return teamuser;
};