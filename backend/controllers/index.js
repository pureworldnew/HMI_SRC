const admin = require('./admin.controller');
const auth = require('./auth.controller');
const revenueContracts = require('./revenue/contract.controller');
const revenueInsights = require('./revenue/insights.controller');
const presentations = require('./presentation.controller');
const alerts = require('./alerts.controller');

module.exports = {
    admin,
    auth,
    
    revenueContracts,
    revenueInsights,
    
    presentations,
    alerts
}