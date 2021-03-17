const ResponseFormat = require('../../core').ResponseFormat;
const db = require("../../db/models").sequelize;



module.exports = {

    async getAccountManagers(req, res){
        try {
            let { companyId } = req.params;
            let companiesResult = await db.query(`SELECT DISTINCT Master.Company, Master.CompanyID, Master.AccountManager,
                (SELECT GROUP_CONCAT(DISTINCT child.AccountManager) from Contracts child where child.company_id="${companyId}" AND child.Company=Master.Company) AS managers
                from Contracts Master where Master.company_id="${companyId}" GROUP BY Master.Company`,
            {
                type: db.QueryTypes.SELECT
            });
            let managers = await db.query(`SELECT GROUP_CONCAT(DISTINCT AccountManager) AS AllManagers from Contracts where company_id="${companyId}" `, {
                type: db.QueryTypes.SELECT
            });

            let response = {
                accounts: companiesResult,
                managers: managers
            };

            return res.status(200).json(ResponseFormat.build(
                response,
                'Account Managers Information Reterive successfully',
                200,
                'success'
            ));
        } catch (e) {
            return res.status(500).json(ResponseFormat.build(
                e,
                'Internal server error',
                500,
                'Error'
            ));
        }
    }
};
