'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contracts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Company: {
        type: Sequelize.STRING
      },
      EventsCompanyName: {
        type: Sequelize.STRING
      },
      CompanyID: {
        type: Sequelize.STRING
      },
      ContractCompanyName: {
        type: Sequelize.STRING
      },
      ContractAddress: {
        type: Sequelize.STRING
      },
      ContractID: {
        type: Sequelize.STRING
      },
      Active: {
        type: Sequelize.STRING
      },
      ContractDate: {
        type: Sequelize.DATE
      },
      ContractType: {
        type: Sequelize.STRING
      },
      TheirExecutor: {
        type: Sequelize.STRING
      },
      TheirExecutorTitle: {
        type: Sequelize.STRING
      },
      OurExecutor: {
        type: Sequelize.STRING
      },
      GoLiveDate: {
        type: Sequelize.DATE
      },
      ContractStartDate: {
        type: Sequelize.DATE
      },
      ContractEndDate: {
        type: Sequelize.DATE
      },
      ContractEndTerminationDate: {
        type: Sequelize.DATE
      },
      ContractMonths: {
        type: Sequelize.STRING
      },
      DaysUntilRenewal: {
        type: Sequelize.STRING
      },
      BillingStartDate: {
        type: Sequelize.DATE
      },
      BillingFrequency: {
        type: Sequelize.STRING
      },
      ContractTerm: {
        type: Sequelize.STRING
      },
      TermMetric: {
        type: Sequelize.STRING
      },
      AnnualContractValue: {
        type: Sequelize.STRING
      },
      TotalContractValue: {
        type: Sequelize.STRING
      },
      CurrentARR: {
        type: Sequelize.STRING
      },
      SegmentID: {
        type: Sequelize.STRING
      },
      SegmentName: {
        type: Sequelize.STRING
      },
      ProductsPurchased: {
        type: Sequelize.STRING
      },
      Product: {
        type: Sequelize.STRING
      },
      Discounts: {
        type: Sequelize.STRING
      },
      TerminationRights: {
        type: Sequelize.STRING
      },
      NoticetoTerminate: {
        type: Sequelize.STRING
      },
      NoticetoTerminateUnits: {
        type: Sequelize.STRING
      },
      AccountExecutiveID: {
        type: Sequelize.STRING
      },
      AccountExecutive: {
        type: Sequelize.STRING
      },
      AccountManagerID: {
        type: Sequelize.STRING
      },
      AccountManager: {
        type: Sequelize.STRING
      },
      TerminationDate: {
        type: Sequelize.DATE
      },
      TerminationReasonID: {
        type: Sequelize.STRING
      },
      TerminationReason: {
        type: Sequelize.STRING
      },
      TerminationNotes: {
        type: Sequelize.STRING
      },
      PlanName: {
        type: Sequelize.STRING
      },
      PlanName2: {
        type: Sequelize.STRING
      },
      AutoRenew: {
        type: Sequelize.STRING
      },
      Invoicing: {
        type: Sequelize.STRING
      },
      InvoiceAmount: {
        type: Sequelize.STRING
      },
      PricePerUser: {
        type: Sequelize.STRING
      },
      LicensesPurchased: {
        type: Sequelize.STRING
      },
      ContractExternalURL: {
        type: Sequelize.STRING
      },
      ContractInternalURL: {
        type: Sequelize.STRING
      },
      Delivery: {
        type: Sequelize.STRING
      },
      company_Id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contracts');
  }
};