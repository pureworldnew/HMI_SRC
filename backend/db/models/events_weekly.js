'use strict';
const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, DataTypes) => {
  const events_weekly = sequelize.define('events_weekly', {
    company_Id: DataTypes.STRING,
    sheet_company_id: DataTypes.STRING,
    week_ending: DataTypes.STRING,
    other: DataTypes.TEXT
  }, {});
  sequelizePaginate.paginate(events_weekly);
  events_weekly.associate = function(models) {
    // associations can be defined here
  };
  return events_weekly;
};