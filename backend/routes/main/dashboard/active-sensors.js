/**
 * /routes/main/dashboard/activeSensors/
 * @description:: get active sensors on dashboard
 */
const dashboardController = require("../../../controllers/main").dashboard;

module.exports = dashboardController.getActiveSensors;
