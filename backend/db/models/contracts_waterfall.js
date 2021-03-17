'use strict';
const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, DataTypes) => {
  const Contracts_waterfall = sequelize.define(
    'Contracts_waterfall',
    {
      Company: DataTypes.STRING,
      ContractID: DataTypes.STRING,
      AccountManager: DataTypes.STRING,
      AnnualContractValue: DataTypes.STRING,
      StartDate: DataTypes.DATE,
      EndDate: DataTypes.DATE,
      Months: DataTypes.STRING,
      StartMonth: DataTypes.STRING,
      StartYear: DataTypes.STRING,
      MonthlyValue: DataTypes.STRING,
      SegmentID: DataTypes.STRING,
      Segment: DataTypes.STRING,
      TerminationReasonID: DataTypes.STRING,
      Jan2019: DataTypes.STRING,
      Feb2019: DataTypes.STRING,
      Mar2019: DataTypes.STRING,
      Apr2019: DataTypes.STRING,
      May2019: DataTypes.STRING,
      Jun2019: DataTypes.STRING,
      Jul2019: DataTypes.STRING,
      Aug2019: DataTypes.STRING,
      Sep2019: DataTypes.STRING,
      Oct2019: DataTypes.STRING,
      Nov2019: DataTypes.STRING,
      Dec2019: DataTypes.STRING,
      Jan2020: DataTypes.STRING,
      Feb2020: DataTypes.STRING,
      Mar2020: DataTypes.STRING,
      Apr2020: DataTypes.STRING,
      May2020: DataTypes.STRING,
      Jun2020: DataTypes.STRING,
      Jul2020: DataTypes.STRING,
      Aug2020: DataTypes.STRING,
      Sep2020: DataTypes.STRING,
      Oct2020: DataTypes.STRING,
      Nov2020: DataTypes.STRING,
      Dec2020: DataTypes.STRING,
      Jan2021: DataTypes.STRING,
      Feb2021: DataTypes.STRING,
      Mar2021: DataTypes.STRING,
      Apr2021: DataTypes.STRING,
      May2021: DataTypes.STRING,
      Jun2021: DataTypes.STRING,
      Jul2021: DataTypes.STRING,
      Aug2021: DataTypes.STRING,
      Sep2021: DataTypes.STRING,
      Oct2021: DataTypes.STRING,
      Nov2021: DataTypes.STRING,
      Dec2021: DataTypes.STRING,
      company_Id: DataTypes.INTEGER
    }
  )
  sequelizePaginate.paginate(Contracts_waterfall)
  Contracts_waterfall.associate = function (models) {
    // associations can be defined here
  };
  return Contracts_waterfall;
};