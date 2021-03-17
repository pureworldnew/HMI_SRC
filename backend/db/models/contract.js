'use strict';
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define(
    'Contract',
    {
      Company: DataTypes.STRING,
      EventsCompanyName: DataTypes.STRING,
      CompanyID: DataTypes.STRING,
      ContractCompanyName: DataTypes.STRING,
      ContractAddress: DataTypes.STRING,
      ContractID: DataTypes.STRING,
      Active: DataTypes.STRING,
      ContractDate: DataTypes.DATE,
      ContractType: DataTypes.STRING,
      TheirExecutor: DataTypes.STRING,
      TheirExecutorTitle: DataTypes.STRING,
      OurExecutor: DataTypes.STRING,
      GoLiveDate: DataTypes.DATE,
      ContractStartDate: DataTypes.DATE,
      ContractEndDate: DataTypes.DATE,
      ContractEndTerminationDate: DataTypes.DATE,
      ContractMonths: DataTypes.STRING,
      DaysUntilRenewal: DataTypes.STRING,
      BillingStartDate: DataTypes.DATE,
      BillingFrequency: DataTypes.STRING,
      ContractTerm: DataTypes.STRING,
      TermMetric: DataTypes.STRING,
      AnnualContractValue: DataTypes.STRING,
      TotalContractValue: DataTypes.STRING,
      CurrentARR: DataTypes.STRING,
      SegmentID: DataTypes.STRING,
      SegmentName: DataTypes.STRING,
      ProductsPurchased: DataTypes.STRING,
      Product: DataTypes.STRING,
      Discounts: DataTypes.STRING,
      TerminationRights: DataTypes.STRING,
      NoticetoTerminate: DataTypes.STRING,
      NoticetoTerminateUnits: DataTypes.STRING,
      AccountExecutiveID: DataTypes.STRING,
      AccountExecutive: DataTypes.STRING,
      AccountManagerID: DataTypes.STRING,
      AccountManager: DataTypes.STRING,
      TerminationDate: DataTypes.DATE,
      TerminationReasonID: DataTypes.STRING,
      TerminationReason: DataTypes.STRING,
      TerminationNotes: DataTypes.STRING,
      PlanName: DataTypes.STRING,
      PlanName2: DataTypes.STRING,
      AutoRenew: DataTypes.STRING,
      Invoicing: DataTypes.STRING,
      InvoiceAmount: DataTypes.STRING,
      PricePerUser: DataTypes.STRING,
      LicensesPurchased: DataTypes.STRING,
      ContractExternalURL: DataTypes.STRING,
      ContractInternalURL: DataTypes.STRING,
      Delivery: DataTypes.STRING,
      company_Id: DataTypes.INTEGER
    }
  );
  sequelizePaginate.paginate(Contract)
  Contract.associate = function (models) {
    // associations can be defined here
  };
  return Contract;
};