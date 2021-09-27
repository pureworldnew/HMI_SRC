'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  notification.init({
    trigger_temperature: DataTypes.STRING,
    trigger_temperature_condition: DataTypes.STRING,
    trigger_temperature_unit: DataTypes.STRING,
    settings_subject: DataTypes.STRING,
    settings_message: DataTypes.STRING,
    settings_user_id: DataTypes.INTEGER,
    extra_acknowledgeMode: DataTypes.STRING,
    extra_smsMessage: DataTypes.STRING,
    extra_snoozeMode: DataTypes.STRING,
    extra_snoozePeriod: DataTypes.STRING,
    extra_voiceText: DataTypes.STRING,
    action_name: DataTypes.STRING,
    sensor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'notification',
  });
  return notification;
};