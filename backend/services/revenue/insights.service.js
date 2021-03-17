const db = require("../../db/models");
const Helper = require('../../core/helper');
var { months } = require('../../enums/months.enum');

class InsightService {
    async getInsightsCard(roleId, companyId) {
        let ARR = 0, prevARR = 0, customers = 0, prevCustomers = 0,
            NRR = 0, prevNRR = 0, LRR = {}, prevLRR = 0, data = {};
        if (Helper.isNoneMember(roleId, companyId)) { // non company member
            data = {
                'ARR': 0,
                'prevARR': 0,
                'customers': 0,
                'prevCustomers': 0,
                'NRR': 0,
                'prevNRR': 0,
                'LRR': 0,
                'prevLRR': 0
            }
            return { status: true, data: data };
        }
        try {
            if (Helper.isAdmin(roleId)) { // master admin or system admin
                // Get ARR
                let ARRQuery = "SELECT SUM(AnnualContractValue) AS ARR FROM Contracts WHERE Active = 'Yes'"
                ARR = await db.sequelize.query(ARRQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get previous ARR
                let prevARRQuery = "SELECT SUM(AnnualContractValue) AS ARR FROM Contracts WHERE Active = 'Yes' AND MONTH(ContractDate) = MONTH(CURRENT_DATE())-1";
                prevARR = await db.sequelize.query(prevARRQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get Customers
                let customersQuery = `SELECT COUNT(DISTINCT Company) AS customers
                                        FROM Contracts
                                        WHERE Active = 'Yes' AND 
                                            MONTH(ContractDate) = MONTH(CURRENT_DATE()) AND 
                                            YEAR(ContractDate) = YEAR(CURRENT_DATE())`
                customers = await db.sequelize.query(customersQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get previous customers
                let prevCustomersQuery = `SELECT COUNT(DISTINCT Company) AS customers
                                            FROM Contracts
                                            WHERE Active = 'Yes' AND 
                                                MONTH(ContractDate) = MONTH(CURRENT_DATE())-1 AND 
                                                YEAR(ContractDate) = YEAR(CURRENT_DATE())`
                prevCustomers = await db.sequelize.query(prevCustomersQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // // Get NRR
                // let NRRQuery = "SELECT IF(SUM(AnnualContractValue), SUM(AnnualContractValue), 0) AS revLossExp FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE()) AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE())"
                // NRR = await db.sequelize.query(NRRQuery, {
                //     type: db.sequelize.QueryTypes.SELECT
                // });

                // // Get previous NRR
                // let prevNRRQuery = "SELECT IF(SUM(AnnualContractValue), SUM(AnnualContractValue), 0) AS nextRevLossExp FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE())+1 AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE())"
                // prevNRR = await db.sequelize.query(prevNRRQuery, {
                //     type: db.sequelize.QueryTypes.SELECT
                // });

                // // Get LRR
                // let expContractQuery = "SELECT COUNT(*) AS expContract FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE()) AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE())"
                // expContract = await db.sequelize.query(expContractQuery, {
                //     type: db.sequelize.QueryTypes.SELECT
                // });

                // // Get previous LRR
                // let nextExpContractQuery = "SELECT COUNT(*) AS nextExpContract FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE())+1 AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE())"
                // nextExpContract = await db.sequelize.query(nextExpContractQuery, {
                //     type: db.sequelize.QueryTypes.SELECT
                // });
            } else { // company admin or company user
                // Get ARR
                let ARRQuery = `SELECT COUNT(DISTINCT Company) AS activeContractCnt FROM Contracts WHERE Active='Yes' AND company_Id = ${$companyId}`
                ARR = await db.sequelize.query(ARRQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get previous ARR
                let prevARRQuery = `SELECT COUNT(*) AS lastMonth FROM Contracts WHERE Active = 'Yes' AND MONTH(ContractDate)=MONTH(CURRENT_DATE())-1 AND YEAR(ContractDate)=YEAR(CURRENT_DATE()) AND company_Id = ${$companyId}`;
                prevARR = await db.sequelize.query(prevARRQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get Customers
                let customersQuery = `SELECT COUNT(DISTINCT Company) AS customers
                                        FROM Contracts
                                        WHERE Active = 'Yes' AND 
                                            MONTH(ContractDate) = MONTH(CURRENT_DATE()) AND 
                                            YEAR(ContractDate) = YEAR(CURRENT_DATE()) AND
                                            company_Id = ${$companyId}`
                customers = await db.sequelize.query(customersQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get previous customers
                let prevCustomersQuery = `SELECT COUNT(DISTINCT Company) AS customers
                                            FROM Contracts
                                            WHERE Active = 'Yes' AND 
                                                MONTH(ContractDate) = MONTH(CURRENT_DATE())-1 AND 
                                                YEAR(ContractDate) = YEAR(CURRENT_DATE()) AND
                                                company_Id = ${$companyId}`
                prevCustomers = await db.sequelize.query(prevCustomersQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // // Get NRR
                // let NRRQuery = "SELECT IF(SUM(AnnualContractValue), SUM(AnnualContractValue), 0) AS revLossExp FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE()) AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE())"
                // NRR = await db.sequelize.query(NRRQuery, {
                //     type: db.sequelize.QueryTypes.SELECT
                // });

                // // Get previous NRR
                // let prevNRRQuery = "SELECT IF(SUM(AnnualContractValue), SUM(AnnualContractValue), 0) AS nextRevLossExp FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE())+1 AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE())"
                // prevNRR = await db.sequelize.query(prevNRRQuery, {
                //     type: db.sequelize.QueryTypes.SELECT
                // });

                // // Get LRR
                // let LRRQuery = "SELECT COUNT(*) AS expContract FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE()) AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE())"
                // LRR = await db.sequelize.query(LRRQuery, {
                //     type: db.sequelize.QueryTypes.SELECT
                // });

                // // Get previous LRR
                // let prevLRRQuery = "SELECT COUNT(*) AS nextExpContract FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE())+1 AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE())"
                // prevLRR = await db.sequelize.query(prevLRRQuery, {
                //     type: db.sequelize.QueryTypes.SELECT
                // });
            }
            data = {
                'ARR': ARR,
                'prevARR': prevARR,
                'customers': customers,
                'prevCustomers': prevCustomers,
                'NRR': NRR,
                'prevNRR': prevNRR,
                'LRR': LRR,
                'prevLRR': prevLRR
            }
            return { status: true, data: data };
        } catch (e) {
            return { status: false, error: e };
        }
    }
}

module.exports = InsightService
