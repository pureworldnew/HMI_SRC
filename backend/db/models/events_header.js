'use strict';
module.exports = (sequelize, DataTypes) => {
  const events_header = sequelize.define('events_header', {
    company_Id: DataTypes.STRING,
    headers: DataTypes.TEXT,
    types: DataTypes.STRING
  }, {});
  events_header.associate = function(models) {
    // associations can be defined here
  };
  return events_header;
};