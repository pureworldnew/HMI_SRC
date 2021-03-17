'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Segments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SegmentID: {
        type: Sequelize.STRING
      },
      SegmentName: {
        type: Sequelize.STRING
      },
      LowValue: {
        type: Sequelize.STRING
      },
      HighValue: {
        type: Sequelize.STRING
      },
      MonthlyLowValue: {
        type: Sequelize.STRING
      },
      MonthlyHighValue: {
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
    return queryInterface.dropTable('Segments');
  }
};