const ResponseFormat = require('../../core').ResponseFormat;
const db = require("../../db/models");
var InsightService = require('../../services/revenue/insights.service');
var insightService = new InsightService();
const Helper = require('../../core/helper');

module.exports = {
    /**
     * Revenue Insights
     */
    /**
     * 
     * @param {
     *  *date : 2020-03-31
     *  *period : monthly, quarterly, yearly
     * } req 
     * @param {*} res 
     */
    async getCustomersOfSummary(req, res) {
        console.log("req.user is ", req.user);
        let data = {
            countOfCustomer: 0,
            countOfARR: 0
        }

        if (req.user.roleId < 3) { // master admin or system admin
            let countOfCustomer = await db.sequelize.query(`SELECT COUNT(DISTINCT Company) AS countOfCustomer FROM Contracts WHERE Active = 'Yes' AND ContractDate <= STR_TO_DATE('${req.params.date} 00:00:00', '%Y-%m-%d %H:%i:%s') ORDER BY Company`, {
                type: db.sequelize.QueryTypes.SELECT
            });
            let countOfCustomer1 = await db.sequelize.query(`SELECT COUNT(DISTINCT Company) AS countOfCustomer FROM Contracts WHERE Active = 'Yes' AND ContractDate <= STR_TO_DATE('2019-12-31 00:00:00', '%Y-%m-%d %H:%i:%s') ORDER BY Company`, {
                type: db.sequelize.QueryTypes.SELECT
            });
            countOfCustomer.push(countOfCustomer1[0]);
            let countOfARR = await db.sequelize.query(`SELECT SUM(AnnualContractValue) AS countOfARR FROM Contracts WHERE Active = 'Yes' AND ContractDate <= STR_TO_DATE('${req.params.date} 00:00:00', '%Y-%m-%d %H:%i:%s') ORDER BY Company`, {
                type: db.sequelize.QueryTypes.SELECT
            });
            let countOfARR1 = await db.sequelize.query(`SELECT SUM(AnnualContractValue) AS countOfARR FROM Contracts WHERE Active = 'Yes' AND ContractDate <= STR_TO_DATE('2019-12-31 00:00:00', '%Y-%m-%d %H:%i:%s') ORDER BY Company`, {
                type: db.sequelize.QueryTypes.SELECT
            });
            countOfARR.push(countOfARR1[0]);
            data = {
                countOfCustomer: countOfCustomer,
                countOfARR: countOfARR
            }
            return res.status(200).json(ResponseFormat.build(
                data,
                "All Customers Reterive successfully",
                200,
                "success"
            ))
        } else if (req.user.roleId > 2 && req.user.companyId) { // company admin or company user
            let countOfCustomer = await db.sequelize.query(`SELECT COUNT(DISTINCT Company) AS countOfCustomer FROM Contracts WHERE Active = 'Yes' AND ContractDate <= STR_TO_DATE('${req.params.date} 00:00:00', '%Y-%m-%d %H:%i:%s')  AND company_id=${req.user.companyId} ORDER BY Company`, {
                type: db.sequelize.QueryTypes.SELECT
            });

            let countOfARR = await db.sequelize.query(`SELECT SUM(AnnualContractValue) AS countOfARR FROM Contracts WHERE Active = 'Yes' AND ContractDate <= STR_TO_DATE('${req.params.date} 00:00:00', '%Y-%m-%d %H:%i:%s')  AND company_id=${req.user.companyId} ORDER BY Company`, {
                type: db.sequelize.QueryTypes.SELECT
            });

            data = {
                countOfCustomer: countOfCustomer,
                countOfARR: countOfARR
            }

            return res.status(200).json(ResponseFormat.build(
                countOfCustomer,
                "Customer For one Company Reterive successfully",
                200,
                "success"
            ))
        } else { // non company member
            return res.status(200).json(ResponseFormat.build(
                [],
                "non-company member!",
                200,
                "success"
            ))
        }

    },



    /**
     * 
     @param {token} req 
     @param {activeContractCnt, totalContractVal, avgContractVal, revLossExp, nextRevLossExp, expContract, nextExpContract} res
     */
    async insightsCard(req, res) {
        let { roleId, companyId } = req.user;

        let response = await insightService.getInsightsCard(roleId, companyId);
        if (response.status == false) {
            res.status(400).json(ResponseFormat.error(
                response.error,
                "Something went wrong when retrieve insights card data",
                "error"
            ))
        } else {
            res.status(200).json(ResponseFormat.build(
                response.data,
                "insights card data",
                200,
                "success"
            ))
        }
    },
}