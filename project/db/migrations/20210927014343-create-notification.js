'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trigger_temperature: {
        type: Sequelize.STRING
      },
      trigger_temperature_condition: {
        type: Sequelize.STRING
      },
      trigger_temperature_unit: {
        type: Sequelize.STRING
      },
      settings_subject: {
        type: Sequelize.STRING
      },
      settings_message: {
        type: Sequelize.STRING
      },
      settings_user_id: {
        type: Sequelize.INTEGER
      },
      extra_acknowledgeMode: {
        type: Sequelize.STRING
      },
      extra_smsMessage: {
        type: Sequelize.STRING
      },
      extra_snoozeMode: {
        type: Sequelize.STRING
      },
      extra_snoozePeriod: {
        type: Sequelize.STRING
      },
      extra_voiceText: {
        type: Sequelize.STRING
      },
      action_name: {
        type: Sequelize.STRING
      },
      sensor_id: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notifications');
  }
};