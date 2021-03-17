const { authJwt } = require("../middleware");
const revenueContractController = require('../controllers').revenueContracts;
const revenueInsightController = require('../controllers').revenueInsights;


module.exports = function (app) {

    
    app.get('/revenue/contracts/getSegmentData/:companyName', [authJwt.verifyToken], revenueContractController.getSegmentData);

    /**
     * Contract Management routes
     */
    app.get('/revenue/contracts/getDropdownList', [authJwt.verifyToken], revenueContractController.getContractsDropdownList);
    app.get('/revenue/contracts/getContractData/:page/:pageSize/:companyName', [authJwt.verifyToken], revenueContractController.getContractData);
    app.get('/revenue/contracts/getWaterfallData/:page/:pageSize/:companyName/:segment/:topXX/:period', [authJwt.verifyToken], revenueContractController.getWaterfallData);
    app.get('/revenue/contracts/card', [authJwt.verifyToken], revenueContractController.contractsCard);
    app.get('/revenue/contracts/expiringChart/:companyName', [authJwt.verifyToken], revenueContractController.expiringChart);
    app.get('/revenue/contracts/getExpiringTable/:page/:pageSize/:companyName', [authJwt.verifyToken], revenueContractController.getExpriginData);
    app.get('/revenue/contracts/revenueLossExposure/:companyName', [authJwt.verifyToken], revenueContractController.revenueLossExposure);

    /**
     * Revenue Insights routes
     */
    app.get('/revenue/revenueInsights/summary/getCountOfCustomers/:date/:period', [authJwt.verifyToken], revenueInsightController.getCustomersOfSummary);
    app.get('/revenue/revenueInsights/card', [authJwt.verifyToken], revenueInsightController.insightsCard);

};