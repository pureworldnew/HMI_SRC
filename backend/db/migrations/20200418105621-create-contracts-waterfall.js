'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contracts_waterfalls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Company: {
        type: Sequelize.STRING
      },
      ContractID: {
        type: Sequelize.STRING
      },
      AccountManager: {
        type: Sequelize.STRING
      },
      AnnualContractValue: {
        type: Sequelize.STRING
      },
      StartDate: {
        type: Sequelize.DATE
      },
      EndDate: {
        type: Sequelize.DATE
      },
      Months: {
        type: Sequelize.STRING
      },
      StartMonth: {
        type: Sequelize.STRING
      },
      StartYear: {
        type: Sequelize.STRING
      },
      MonthlyValue: {
        type: Sequelize.STRING
      },
      SegmentID: {
        type: Sequelize.STRING
      },
      Segment: {
        type: Sequelize.STRING
      },
      TerminationReasonID: {
        type: Sequelize.STRING
      },
      Jan2019: {
        type: Sequelize.STRING
      },
      Feb2019: {
        type: Sequelize.STRING
      },
      Mar2019: {
        type: Sequelize.STRING
      },
      Apr2019: {
        type: Sequelize.STRING
      },
      May2019: {
        type: Sequelize.STRING
      },
      Jun2019: {
        type: Sequelize.STRING
      },
      Jul2019: {
        type: Sequelize.STRING
      },
      Aug2019: {
        type: Sequelize.STRING
      },
      Sep2019: {
        type: Sequelize.STRING
      },
      Oct2019: {
        type: Sequelize.STRING
      },
      Nov2019: {
        type: Sequelize.STRING
      },
      Dec2019: {
        type: Sequelize.STRING
      },
      Jan2020: {
        type: Sequelize.STRING
      },
      Feb2020: {
        type: Sequelize.STRING
      },
      Mar2020: {
        type: Sequelize.STRING
      },
      Apr2020: {
        type: Sequelize.STRING
      },
      May2020: {
        type: Sequelize.STRING
      },
      Jun2020: {
        type: Sequelize.STRING
      },
      Jul2020: {
        type: Sequelize.STRING
      },
      Aug2020: {
        type: Sequelize.STRING
      },
      Sep2020: {
        type: Sequelize.STRING
      },
      Oct2020: {
        type: Sequelize.STRING
      },
      Nov2020: {
        type: Sequelize.STRING
      },
      Dec2020: {
        type: Sequelize.STRING
      },
      Jan2021: {
        type: Sequelize.STRING
      },
      Feb2021: {
        type: Sequelize.STRING
      },
      Mar2021: {
        type: Sequelize.STRING
      },
      Apr2021: {
        type: Sequelize.STRING
      },
      May2021: {
        type: Sequelize.STRING
      },
      Jun2021: {
        type: Sequelize.STRING
      },
      Jul2021: {
        type: Sequelize.STRING
      },
      Aug2021: {
        type: Sequelize.STRING
      },
      Sep2021: {
        type: Sequelize.STRING
      },
      Oct2021: {
        type: Sequelize.STRING
      },
      Nov2021: {
        type: Sequelize.STRING
      },
      Dec2021: {
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
    return queryInterface.dropTable('Contracts_waterfalls');
  }
};