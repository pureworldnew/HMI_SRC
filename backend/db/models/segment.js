'use strict';
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Segment = sequelize.define('Segment', {
    SegmentID: DataTypes.STRING,
    SegmentName: DataTypes.STRING,
    LowValue: DataTypes.STRING,
    HighValue: DataTypes.STRING,
    MonthlyLowValue: DataTypes.STRING,
    MonthlyHighValue: DataTypes.STRING,
    company_Id: DataTypes.INTEGER
  })
  sequelizePaginate.paginate(Segment)
  Segment.associate = function (models) {
    // associations can be defined here
  };
  return Segment;
};