/**
 * /routes/main/sensors/sensorsList/
 * @description:: get active sensors on dashboard
 */
const sensorController = require("../../../controllers/main").sensors;

module.exports = sensorController.getSensorList;
