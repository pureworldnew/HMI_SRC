const { authJwt } = require("../middleware");
const accountController = require('../controllers/account').managers;
const accountWeekliesController = require('../controllers/account').weeklies;


module.exports = function (app) {

    app.get('/account/managers/:companyId', [authJwt.verifyToken], accountController.getAccountManagers);
    app.get('/account/events_weeklies/:timebase/:company_id', [authJwt.verifyToken], accountWeekliesController.getEventsWeeklies);
    app.get('/account/events_weeklies_barcharts/:timebase/:company_id', [authJwt.verifyToken], accountWeekliesController.getBarChartEventsWeeklies);

};
