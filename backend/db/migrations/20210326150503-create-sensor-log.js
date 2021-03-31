'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SensorLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      includeDate: {
        type: Sequelize.DATEONLY
      },
      includeTime: {
        type: Sequelize.TIME
      },
      deviceName: {
        type: Sequelize.STRING
      },
      macAddress: {
        type: Sequelize.STRING
      },
      temp1: {
        type: Sequelize.STRING
      },
      temp2: {
        type: Sequelize.STRING
      },
      voltage: {
        type: Sequelize.DOUBLE
      },
      includeDateTime: {
        type: Sequelize.DATE
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SensorLogs');
  }
};