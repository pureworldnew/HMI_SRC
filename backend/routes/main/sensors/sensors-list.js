/**
 * /routes/main/sensors/sensorsList/
 * @description:: get active sensors on dashboard
 */
const sensorController = require("../../../controllers").sensors;

module.exports = sensorController.getCompanyList;
