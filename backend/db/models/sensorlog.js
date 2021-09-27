'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sensorlog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  sensorlog.init({
    includeDate: DataTypes.DATEONLY,
    includeTime: DataTypes.TIME,
    deviceName: DataTypes.STRING,
    macAddress: DataTypes.STRING,
    temp1: DataTypes.STRING,
    temp2: DataTypes.STRING,
    voltage: DataTypes.DOUBLE,
    includeDateTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'sensorlog',
  });
  return sensorlog;
};