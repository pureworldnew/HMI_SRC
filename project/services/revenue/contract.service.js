const db = require("../../db/models");
const Helper = require('../../core/helper');
var { months } = require('../../enums/months.enum');

class ContractService {


    async findDropdownList(roleId, companyId) {
        let companyList = [];
        if (Helper.isNoneMember(roleId, companyId)) { // non company member
            return { status: true, data: companyList };
        }

        try {
            if (Helper.isAdmin(roleId)) { // master admin or system admin
                companyList = await db.sequelize.query(`SELECT DISTINCT Company AS title FROM Contracts ORDER BY Company`, {
                    type: db.sequelize.QueryTypes.SELECT
                });
            } else { // company admin or company user
                companyList = await db.sequelize.query(`SELECT DISTINCT Company AS title FROM Contracts WHERE company_Id=${companyId} ORDER BY Company`, {
                    type: db.sequelize.QueryTypes.SELECT
                });
            }
            return { status: true, data: companyList };
        } catch (e) {
            return { status: false, error: e };
        }
    }


    async findContractData(roleId, companyId, filterParams) {
        let { page, pageSize, companyName } = filterParams,
            offset = parseInt(page) * parseInt(pageSize),
            whereClause = ``, tableName = 'Contracts', totalCntQuery = ``, filterQuery = ``,
            total = 0, pages = 0, data = [];

        if (Helper.isNoneMember(roleId, companyId)) { // non company member
            return { status: true, data: [], total: 0, pages: 0 };
        }

        try {
            if (Helper.isAdmin(roleId)) { // master admin or system admin
                whereClause += companyName !== "null" ? `AND Company = '${companyName}'` : ``
            } else { // company admin or company user
                whereClause += companyId ? `AND company_Id = '${companyId}'` : ``
                whereClause += companyName !== "null" ? `AND Company = '${companyName}'` : ``
            }
            totalCntQuery = `SELECT COUNT(*) AS total FROM ${tableName} WHERE 1=1 ${whereClause}`;
            filterQuery = `SELECT * 
                        FROM ${tableName}
                        WHERE 1=1 ${whereClause}
                        ORDER BY Company 
                        LIMIT ${offset}, ${pageSize}`;

            total = await db.sequelize.query(totalCntQuery, {
                type: db.sequelize.QueryTypes.SELECT
            })
            pages = Math.ceil(total[0].total / parseInt(pageSize));

            data = await db.sequelize.query(filterQuery, {
                type: db.sequelize.QueryTypes.SELECT
            })
            return { status: true, data: data, total: total, pages: pages };

        } catch (e) {
            return { status: false, error: e };
        }
    }


    async findWaterfallData(roleId, companyId, filterParams) {
        let { page, pageSize, companyName, segment, topXX, period } = filterParams,
            offset = parseInt(page) * parseInt(pageSize),
            whereClause = ``, tableName = 'Contracts_waterfalls', totalCntQuery = ``, filterQuery = ``,
            total = 0, pages = 0, data = [];

        if (Helper.isNoneMember(roleId, companyId)) { // non company member
            return { status: true, data: [], total: 0, pages: 0 };
        }

        try {
            if (Helper.isAdmin(roleId)) { // master admin or system admin
                whereClause += companyName !== "null" ? `AND Company = '${companyName}'` : ``
            } else { // company admin or company user
                whereClause += companyId ? `AND company_Id = '${companyId}'` : ``
                whereClause += companyName !== "null" ? `AND Company = '${companyName}'` : ``
            }
            totalCntQuery = `SELECT COUNT(*) AS total FROM ${tableName} WHERE 1=1 ${whereClause}`;
            filterQuery = `SELECT * 
                        FROM ${tableName}
                        WHERE 1=1 ${whereClause}
                        ORDER BY Company 
                        LIMIT ${offset}, ${pageSize}`;

            // IF Top xx is setted
            // if (req.params.top !== "null") {
            //     query = ``;
            //     totalCntQuery = ``;

            //     let top = req.params.top;

            //     // if top XX %
            //     if (top.indexOf('%') > -1) {
            //         let companyFilterClause = req.params.companyName === "null" ? `` : `AND sam.Company = '${req.params.companyName}'`
            //         let middleQuery = `(SELECT *
            //             FROM (
            //             SELECT *, SUM(AnnualContractValue) AS tcv
            //             FROM ${tableName}
            //             GROUP BY Company) sam
            //             WHERE 1=1 ${companyFilterClause}
            //             ORDER BY sam.tcv DESC
            //             LIMIT 0, ${top}) top`

            //         totalCntQuery = `SELECT COUNT(*) AS total FROM ${middleQuery} LIMIT 0, ${top}`
            //         query = `SELECT *
            //                 FROM 
            //                 ${middleQuery}
            //                 LIMIT ${offset}, ${pageSize}`;

            //         await db.sequelize.query(totalCntQuery, {
            //             type: db.sequelize.QueryTypes.SELECT
            //         }).then(async (total) => {
            //             let pages = Math.ceil(total[0].total / pageSize);

            //             await db.sequelize.query(query, {
            //                 type: db.sequelize.QueryTypes.SELECT
            //             })
            //                 .then((docs) => {
            //                     // var groupedResult = Helper.groupArrayOfObjects(docs)
            //                     return res.status(200).json(ResponseFormat.build(
            //                         { 'result': docs, 'totalCount': total, 'pages': pages },
            //                         "Contract Information Reterive by Company name successfully",
            //                         200,
            //                         "success"
            //                     ))
            //                 })
            //         })
            //     } else {
            //         // If company dropdropdown filter is setted
            //         let companyFilterClause = req.params.companyName === "null" ? `` : `AND sam.Company = '${req.params.companyName}'`
            //         let middleQuery = `(SELECT *
            //             FROM (
            //             SELECT *, SUM(AnnualContractValue) AS tcv
            //             FROM ${tableName}
            //             GROUP BY Company) sam
            //             WHERE 1=1 ${companyFilterClause}
            //             ORDER BY sam.tcv DESC
            //             LIMIT 0, ${top}) top`

            //         totalCntQuery = `SELECT COUNT(*) AS total FROM ${middleQuery} LIMIT 0, ${top}`
            //         query = `SELECT *
            //                 FROM 
            //                 ${middleQuery}
            //                 LIMIT ${offset}, ${pageSize}`;


            //         await db.sequelize.query(totalCntQuery, {
            //             type: db.sequelize.QueryTypes.SELECT
            //         }).then(async (total) => {
            //             let pages = Math.ceil(total[0].total / pageSize);

            //             await db.sequelize.query(query, {
            //                 type: db.sequelize.QueryTypes.SELECT
            //             })
            //                 .then((docs) => {
            //                     // var groupedResult = Helper.groupArrayOfObjects(docs)
            //                     return res.status(200).json(ResponseFormat.build(
            //                         { 'result': docs, 'totalCount': total, 'pages': pages },
            //                         "Contract Information Reterive by Company name successfully",
            //                         200,
            //                         "success"
            //                     ))
            //                 })
            //         })
            //     }

            //     await db.sequelize.query(totalCntQuery, {
            //         type: db.sequelize.QueryTypes.SELECT
            //     }).then(async (total) => {
            //         let pages = Math.ceil(total[0].total / pageSize);

            //         await db.sequelize.query(query, {
            //             type: db.sequelize.QueryTypes.SELECT
            //         })
            //             .then((docs) => {
            //                 // var groupedResult = Helper.groupArrayOfObjects(docs)
            //                 return res.status(200).json(ResponseFormat.build(
            //                     { 'result': docs, 'totalCount': total, 'pages': pages },
            //                     "Contract Information Reterive by Company name successfully",
            //                     200,
            //                     "success"
            //                 ))
            //             })
            //     })
            // }

            total = await db.sequelize.query(totalCntQuery, {
                type: db.sequelize.QueryTypes.SELECT
            })
            data = await db.sequelize.query(filterQuery, {
                type: db.sequelize.QueryTypes.SELECT
            })
            pages = Math.ceil(total[0].total / parseInt(pageSize));
            return { status: true, data: data, total: total, pages: pages };

        } catch (e) {
            return { status: false, error: e };
        }
    }


    async findExpringTableData(roleId, companyId, filterParams) {
        let { page, pageSize, companyName } = filterParams,
            offset = parseInt(page) * parseInt(pageSize),
            whereClause = `MONTH(ContractEndDate) <= MONTH(CURRENT_DATE()) AND YEAR(ContractEndDate) <= YEAR(CURRENT_DATE())`,
            tableName = 'Contracts', totalCntQuery = ``, filterQuery = ``,
            total = 0, pages = 0, data = [];

        if (Helper.isNoneMember(roleId, companyId)) { // non company member
            return { status: true, data: [], total: 0, pages: 0 };
        }

        try {
            if (Helper.isAdmin(roleId)) { // master admin or system admin
                whereClause += companyName !== "null" ? `AND Company = '${companyName}'` : ``
            } else { // company admin or company user
                whereClause += companyId ? `AND company_Id = '${companyId}'` : ``
                whereClause += companyName !== "null" ? `AND Company = '${companyName}'` : ``
            }
            totalCntQuery = `SELECT COUNT(DISTINCT Company) AS total FROM ${tableName} WHERE 1=1 AND ${whereClause}`;
            filterQuery = `SELECT Company, ContractID, ContractEndDate, DaysUntilRenewal
                        FROM ${tableName}
                        WHERE ${whereClause}
                        LIMIT ${offset}, ${pageSize}`

            total = await db.sequelize.query(totalCntQuery, {
                type: db.sequelize.QueryTypes.SELECT
            })
            pages = Math.ceil(total[0].total / parseInt(pageSize));

            data = await db.sequelize.query(filterQuery, {
                type: db.sequelize.QueryTypes.SELECT
            })
            return { status: true, data: data, total: total, pages: pages };

        } catch (e) {
            return { status: false, error: e };
        }
    }


    async findExpiringChartData(roleId, companyId, filterParams) {
        let { companyName } = filterParams,
            whereClause = `YEAR(ContractEndDate) = YEAR(CURRENT_DATE())`,
            tableName = 'Contracts', query = ``,
            data = [], result = [];

        if (Helper.isNoneMember(roleId, companyId)) { // non company member
            return { status: true, data: [] };
        }

        try {
            if (Helper.isAdmin(roleId)) { // master admin or system admin
                whereClause += companyName !== "null" ? `AND Company = '${companyName}'` : ``
            } else { // company admin or company user
                whereClause += companyId ? `AND company_Id = '${companyId}'` : ``
                whereClause += companyName !== "null" ? `AND Company = '${companyName}'` : ``
            }
            query = `SELECT * 
                     FROM (SELECT DATE_FORMAT(ContractEndDate, '%b') AS mon, COUNT(ContractEndDate) AS Amount 
                            FROM ${tableName}
                            WHERE ${whereClause}
                            GROUP BY MONTH(ContractEndDate)) ecd 
                    WHERE ecd.mon IS NOT NULL`

            data = await db.sequelize.query(query, {
                type: db.sequelize.QueryTypes.SELECT
            });

            months.forEach(month => {
                const item = data.find(item => item.mon === month);

                if (item) {
                    result.push(item);
                } else {
                    result.push({ mon: month, Amount: 0 });
                }
            })
            return { status: true, data: result };

        } catch (e) {
            return { status: false, error: e };
        }
    }


    async getSmallAdminCardVal() {
        let contractsWhereClause = ``, query = ``, tableName = 'Contracts', data = [];
        contractsWhereClause = `Active = 'Yes' AND YEAR(CURRENT_DATE())=(YEAR(ContractDate))`;

        // master or system admin case, use default segment value: SMB 0 24999.99, Mid 25000.00 - 99999.99, Enterprise 100000+,
        query = `SELECT temp.Company AS Company, temp.yea AS yea, temp.mon AS mon, SUM(temp.acv) AS acv, temp.segmentName AS segmentName
                    FROM (SELECT cs.yea, cs.mon, cs.Company, cs.acv,
                    CASE
                        WHEN cs.acv < 25000 THEN 'SMB'
                        WHEN cs.acv >= 25000 AND cs.acv < 100000 THEN 'Mid'
                        ELSE 'Enterprise'
                    END AS segmentName
                    FROM (SELECT YEAR(ContractDate) AS yea, MONTH(ContractDate) AS mon, Company, SUM(AnnualContractValue) acv
                    FROM ${tableName}
                    WHERE ${contractsWhereClause}
                    GROUP BY Company, MONTH(ContractDate)
                    ORDER BY MONTH(ContractDate)) cs) temp
                    WHERE temp.segmentName != ''
                    GROUP BY temp.segmentName, temp.mon
                    ORDER BY temp.mon, temp.segmentName`;
        data = await db.sequelize.query(query, {
            type: db.sequelize.QueryTypes.SELECT
        });

        let sumEnt = 0, cntEnt = 0, sumSmall = 0, cntSmall = 0, sumMid = 0, cntMid = 0;
        for (let i = 0; i < data.length; i++) {
            let item1 = data.find(item => item.segmentName === 'Enterprise');
            let item2 = data.find(item => item.segmentName === 'Mid');
            let item3 = data.find(item => item.segmentName === 'SMB');
            if (item1) {
                sumEnt += item1.acv; cntEnt++;
            }
            if (item2) {
                sumMid += item2.acv; cntMid++;
            }
            if (item3) {
                sumSmall += item3.acv; cntSmall++;
            }
        }
        let ent = Math.ceil(sumEnt / cntEnt)
        let mid = Math.ceil(sumMid / cntMid)
        let small = Math.ceil(sumSmall / cntSmall)

        return { small: small, mid: mid, ent: ent }
    }

    async getSmallNormalCardVal(companyId) {
        let contractsWhereClause = ``, segmentsWhereClause = ``, query = ``, tableName = 'Contracts', data = [];
        contractsWhereClause = `Active = 'Yes' AND YEAR(CURRENT_DATE())=(YEAR(ContractDate)) AND company_Id = '${companyId}'`
        segmentsWhereClause = `company_Id = '${companyId}'`

        query = `SELECT temp.Company AS Company, temp.yea AS yea, temp.mon AS mon, SUM(temp.acv) AS acv, temp.segmentName AS segmentName
                FROM (SELECT cs.yea, cs.mon, cs.Company, cs.acv, IF(cs.acv > ss.LowValue AND ss.HighValue > cs.acv, ss.SegmentName, '') AS segmentName
                FROM (SELECT YEAR(ContractDate) AS yea, MONTH(ContractDate) AS mon, Company, SUM(AnnualContractValue) acv
                FROM ${tableName}
                WHERE ${contractsWhereClause}
                GROUP BY Company, MONTH(ContractDate)
                ORDER BY MONTH(ContractDate)) cs,
                (SELECT *
                FROM Segments
                WHERE ${segmentsWhereClause}) ss) temp
                WHERE temp.segmentName != ''
                GROUP BY temp.segmentName, temp.mon
                ORDER BY temp.mon, temp.segmentName`
        data = await db.sequelize.query(query, {
            type: db.sequelize.QueryTypes.SELECT
        });

        let sumEnt = 0, cntEnt = 0, sumSmall = 0, cntSmall = 0, sumMid = 0, cntMid = 0;
        for (let i = 0; i < data.length; i++) {
            let item1 = data.find(item => item.segmentName === 'Enterprise');
            let item2 = data.find(item => item.segmentName === 'Mid');
            let item3 = data.find(item => item.segmentName === 'SMB');
            if (item1) {
                sumEnt += item1.acv; cntEnt++;
            }
            if (item2) {
                sumMid += item2.acv; cntMid++;
            }
            if (item3) {
                sumSmall += item3.acv; cntSmall++;
            }
        }
        let ent = Math.ceil(sumEnt / cntEnt)
        let mid = Math.ceil(sumMid / cntMid)
        let small = Math.ceil(sumSmall / cntSmall)

        return { small: small, mid: mid, ent: ent }
    }


    async getContractCard(roleId, companyId) {
        // cars = await db.sequelize.query('SELECT "id" FROM Cars" WHERE "Cars"."ownerId" = (:id)', {
        //     replacements: { id: req.user.id },
        //     type: db.sequelize.QueryTypes.SELECT
        // });
        let activeContractCnt = 0, avgContractVal = 0, revLossExp = 0, nextRevLossExp = 0, expContract = 0, lastMonth = 0,
            nextExpContract = 0, totalContractVal = 0, smallCardVal = {}, mid = 0, ent = 0, data = {};
        if (Helper.isNoneMember(roleId, companyId)) { // non company member
            data = {
                'activeContractCnt': 0,
                'totalContractVal': 0,
                'avgContractVal': 0,
                'revLossExp': 0,
                'nextRevLossExp': 0,
                'expContract': 0,
                'nextExpContract': 0,
                'small': 0,
                'mid': 0,
                'ent': 0
            }
            return { status: true, data: data };
        }
        try {
            if (Helper.isAdmin(roleId)) { // master admin or system admin
                // Get Active Contracts
                let activeContractCntQuery = "SELECT COUNT(DISTINCT Company) AS activeContractCnt FROM Contracts WHERE Active='Yes'"
                activeContractCnt = await db.sequelize.query(activeContractCntQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // number of last month active
                let lastMonthQuery = "SELECT COUNT(*) AS lastMonth FROM Contracts WHERE Active = 'Yes' AND MONTH(ContractDate)=MONTH(CURRENT_DATE())-1 AND YEAR(ContractDate)=YEAR(CURRENT_DATE())";
                lastMonth = await db.sequelize.query(lastMonthQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get Annual Contract Value
                let avgContractValQuery = "SELECT IF(ROUND(SUM(AnnualContractValue)/SUM(CASE WHEN `AnnualContractValue` IS NULL OR `AnnualContractValue` = '0' OR `AnnualContractValue` = '' THEN 0 ELSE 1 END), 0), ROUND(SUM(AnnualContractValue)/SUM(CASE WHEN `AnnualContractValue` IS NULL OR `AnnualContractValue` = '0' OR `AnnualContractValue` = '' THEN 0 ELSE 1 END), 0), 0) AS avgContractVal FROM Contracts WHERE YEAR(ContractDate) = YEAR(CURRENT_DATE())"
                avgContractVal = await db.sequelize.query(avgContractValQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get Total Contract Value
                let totalContractValQuery = "SELECT IF(ROUND(SUM(AnnualContractValue)/SUM(CASE WHEN `AnnualContractValue` IS NULL OR `AnnualContractValue` = '0' OR `AnnualContractValue` = '' THEN 0 ELSE 1 END), 0), ROUND(SUM(AnnualContractValue)/SUM(CASE WHEN `AnnualContractValue` IS NULL OR `AnnualContractValue` = '0' OR `AnnualContractValue` = '' THEN 0 ELSE 1 END), 0), 0) AS avgContractVal FROM Contracts"
                totalContractVal = await db.sequelize.query(totalContractValQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get Revenue Loss Exposure this month
                let revLossExpQuery = "SELECT IF(SUM(AnnualContractValue), SUM(AnnualContractValue), 0) AS revLossExp FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE()) AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE())"
                revLossExp = await db.sequelize.query(revLossExpQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get Next Revenue Loss Exposure this month
                let nextRevLossExpQuery = "SELECT IF(SUM(AnnualContractValue), SUM(AnnualContractValue), 0) AS nextRevLossExp FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE())+1 AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE())"
                nextRevLossExp = await db.sequelize.query(nextRevLossExpQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get Expiring this month
                let expContractQuery = "SELECT COUNT(*) AS expContract FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE()) AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE())"
                expContract = await db.sequelize.query(expContractQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get Expiring this month
                let nextExpContractQuery = "SELECT COUNT(*) AS nextExpContract FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE())+1 AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE())"
                nextExpContract = await db.sequelize.query(nextExpContractQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get small font card value for admin
                smallCardVal = await this.getSmallAdminCardVal()
            } else { // company admin or company user
                // Get Active Contracts
                let activeContractCntQuery = `SELECT COUNT(DISTINCT Company) AS activeContractCnt FROM Contracts WHERE Active='Yes' AND company_Id=${companyId}`
                activeContractCnt = await db.sequelize.query(activeContractCntQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // number of last month active
                let lastMonthQuery = `SELECT COUNT(*) AS lastMonth FROM Contracts WHERE Active = 'Yes' AND MONTH(ContractDate)=MONTH(CURRENT_DATE())-1 AND YEAR(ContractDate)=YEAR(CURRENT_DATE()) AND company_id=${companyId}`;
                lastMonth = await db.sequelize.query(lastMonthQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get Annual Contract Value
                let avgContractValQuery = "SELECT IF(ROUND(SUM(AnnualContractValue)/SUM(CASE WHEN `AnnualContractValue` IS NULL OR `AnnualContractValue` = '0' OR `AnnualContractValue` = '' THEN 0 ELSE 1 END), 0), ROUND(SUM(AnnualContractValue)/SUM(CASE WHEN `AnnualContractValue` IS NULL OR `AnnualContractValue` = '0' OR `AnnualContractValue` = '' THEN 0 ELSE 1 END), 0), 0) AS avgContractVal FROM Contracts WHERE YEAR(ContractDate) = YEAR(CURRENT_DATE()) AND company_Id=" + `${companyId}`
                avgContractVal = await db.sequelize.query(avgContractValQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get Total Contract Value
                let totalContractValQuery = `SELECT IF(ROUND(SUM(AnnualContractValue)/SUM(CASE WHEN AnnualContractValue IS NULL OR AnnualContractValue = '0' OR AnnualContractValue = '' THEN 0 ELSE 1 END), 0), ROUND(SUM(AnnualContractValue)/SUM(CASE WHEN AnnualContractValue IS NULL OR AnnualContractValue = '0' OR AnnualContractValue = '' THEN 0 ELSE 1 END), 0), 0) AS avgContractVal FROM Contracts WHERE company_Id=${companyId}`

                totalContractVal = await db.sequelize.query(totalContractValQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get Revenue Loss Exposure this month
                let revLossExpQuery = `SELECT IF(SUM(AnnualContractValue), SUM(AnnualContractValue), 0) AS revLossExp FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE()) AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE()) AND company_Id=${companyId}`
                revLossExp = await db.sequelize.query(revLossExpQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get Next Revenue Loss Exposure this month
                let nextRevLossExpQuery = `SELECT IF(SUM(AnnualContractValue), SUM(AnnualContractValue), 0) AS nextRevLossExp FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE())+1 AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE()) AND company_Id=${companyId}`
                nextRevLossExp = await db.sequelize.query(nextRevLossExpQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get Expiring this month
                let expContractQuery = `SELECT COUNT(*) AS expContract FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE()) AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE()) AND company_Id=${companyId}`
                expContract = await db.sequelize.query(expContractQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get Expiring this month
                let nextExpContractQuery = `SELECT COUNT(*) AS nextExpContract FROM Contracts WHERE MONTH(ContractEndDate) = MONTH(CURRENT_DATE())+1 AND YEAR(ContractEndDate) = YEAR(CURRENT_DATE()) AND company_Id=${companyId}`
                nextExpContract = await db.sequelize.query(nextExpContractQuery, {
                    type: db.sequelize.QueryTypes.SELECT
                });

                // Get small font card value for normal company member
                smallCardVal = await this.getSmallNormalCardVal(companyId)
            }
            data = {
                'activeContractCnt': activeContractCnt,
                'lastMonth': lastMonth,
                'totalContractVal': totalContractVal,
                'avgContractVal': avgContractVal,
                'revLossExp': revLossExp,
                'nextRevLossExp': nextRevLossExp,
                'expContract': expContract,
                'nextExpContract': nextExpContract,
                'small': smallCardVal.small ? smallCardVal.small : 0,
                'mid': smallCardVal.mid ? smallCardVal.mid : 0,
                'ent': smallCardVal.ent ? smallCardVal.ent : 0
            }
            return { status: true, data: data };
        } catch (e) {
            return { status: false, error: e };
        }
    }


    async getRevenueLossExposure(roleId, companyId, filterParams) {
        let { companyName } = filterParams,
            whereClauseACV = `YEAR(ContractEndDate) = YEAR(CURRENT_DATE())`,
            whereClauseTCV = ``,
            tableName = 'Contracts', queryACV = ``, queryTCV = ``,
            dataACV = [], dataTCV = [], resultACV = [], resultTCV = [], result = {};

        if (Helper.isNoneMember(roleId, companyId)) { // non company member
            return { status: true, data: [] };
        }

        try {
            if (Helper.isAdmin(roleId)) { // master admin or system admin
                whereClauseACV += companyName !== "null" ? ` AND Company = '${companyName}'` : ``
                whereClauseTCV += companyName !== "null" ? ` AND Company = '${companyName}'` : ``
            } else { // company admin or company user
                whereClauseACV += companyId ? ` AND company_Id = '${companyId}'` : ``
                whereClauseACV += companyName !== "null" ? ` AND Company = '${companyName}'` : ``
                whereClauseTCV += companyId ? ` AND company_Id = '${companyId}'` : ``
                whereClauseTCV += companyName !== "null" ? ` AND Company = '${companyName}'` : ``
            }
            // ACV
            queryACV = `SELECT * 
                    FROM (SELECT DATE_FORMAT(ContractEndDate, '%b') AS mon, IF(SUM(AnnualContractValue), SUM(AnnualContractValue), 0) AS Amount
                        FROM ${tableName}
                        WHERE ${whereClauseACV} 
                        GROUP BY MONTH(ContractEndDate),YEAR(ContractEndDate)) rle 
                    WHERE rle.mon IS NOT NULL`
            dataACV = await db.sequelize.query(queryACV, {
                type: db.sequelize.QueryTypes.SELECT
            });

            // TCV
            queryTCV = `SELECT * 
                    FROM (SELECT DATE_FORMAT(ContractEndDate, '%b') AS mon, IF(SUM(AnnualContractValue), SUM(AnnualContractValue), 0) AS Amount
                        FROM ${tableName}
                        WHERE 1=1 ${whereClauseTCV} 
                        GROUP BY MONTH(ContractEndDate)) rle 
                    WHERE rle.mon IS NOT NULL`
            dataTCV = await db.sequelize.query(queryTCV, {
                type: db.sequelize.QueryTypes.SELECT
            });
            

            months.forEach(month => {
                const item = dataACV.find(item => item.mon === month);
                const item1 = dataTCV.find(item => item.mon === month);

                if (item) {
                    resultACV.push(item);
                } else {
                    resultACV.push({ mon: month, Amount: 0 });
                }

                if (item1) {
                    resultTCV.push(item1);
                } else {
                    resultTCV.push({ mon: month, Amount: 0 });
                }
            })
            
            result = { ACV: resultACV, TCV: resultTCV }
            return { status: true, data: result };

        } catch (e) {
            return { status: false, error: e };
        }
    }


    async findSegmentData(roleId, companyId, filterParams) {
        let { companyName } = filterParams,
            contractsWhereClause = ``, segmentsWhereClause = ``,
            tableName = 'Contracts', query = ``,
            data = [], json_data = [], temp_array = {};

        if (Helper.isNoneMember(roleId, companyId)) { // non company member
            return { status: true, data: [] };
        }

        try {
            if (Helper.isAdmin(roleId)) { // master admin or system admin
                contractsWhereClause = companyName === "null" ? ` Active = 'Yes' AND YEAR(CURRENT_DATE())=(YEAR(ContractDate))`
                    : ` Active = 'Yes' AND YEAR(CURRENT_DATE())=(YEAR(ContractDate)) AND Company = '${companyName}'`;
                // master or system admin case, use default segment value: SMB 0 24999.99, Mid 25000.00 - 99999.99, Enterprise 100000+,
                query = `SELECT temp.Company AS Company, temp.yea AS yea, temp.mon AS mon, SUM(temp.acv) AS acv, temp.segmentName AS segmentName
                        FROM (SELECT cs.yea, cs.mon, cs.Company, cs.acv,
                        CASE
                            WHEN cs.acv < 25000 THEN 'SMB'
                            WHEN cs.acv >= 25000 AND cs.acv < 100000 THEN 'Mid'
                            ELSE 'Enterprise'
                        END AS segmentName
                        FROM (SELECT YEAR(ContractDate) AS yea, MONTH(ContractDate) AS mon, Company, SUM(AnnualContractValue) acv
                        FROM ${tableName}
                        WHERE ${contractsWhereClause}
                        GROUP BY Company, MONTH(ContractDate)
                        ORDER BY MONTH(ContractDate)) cs) temp
                        WHERE temp.segmentName != ''
                        GROUP BY temp.segmentName, temp.mon
                        ORDER BY temp.mon, temp.segmentName`
            } else { // company admin or company user
                contractsWhereClause = companyName === "null" ? ` Active = 'Yes' AND YEAR(CURRENT_DATE())=(YEAR(ContractDate)) AND company_Id = '${companyId}'`
                    : ` Active = 'Yes' AND YEAR(CURRENT_DATE())=(YEAR(ContractDate)) AND company_Id = '${companyId}' AND Company = '${companyName}'`
                segmentsWhereClause = companyName === "null" ? ` company_Id = '${companyId}'`
                    : ` company_Id = '${companyId}'`

                query = `SELECT temp.Company AS Company, temp.yea AS yea, temp.mon AS mon, SUM(temp.acv) AS acv, temp.segmentName AS segmentName
                        FROM (SELECT cs.yea, cs.mon, cs.Company, cs.acv, IF(cs.acv > ss.LowValue AND ss.HighValue > cs.acv, ss.SegmentName, '') AS segmentName
                        FROM (SELECT YEAR(ContractDate) AS yea, MONTH(ContractDate) AS mon, Company, SUM(AnnualContractValue) acv
                        FROM ${tableName}
                        WHERE ${contractsWhereClause}
                        GROUP BY Company, MONTH(ContractDate)
                        ORDER BY MONTH(ContractDate)) cs,
                        (SELECT *
                        FROM Segments
                        WHERE ${segmentsWhereClause}) ss) temp
                        WHERE temp.segmentName != ''
                        GROUP BY temp.segmentName, temp.mon
                        ORDER BY temp.mon, temp.segmentName`
            }
            data = await db.sequelize.query(query, {
                type: db.sequelize.QueryTypes.SELECT
            });

            for (let i = 1; i < 13; i++) {
                let item1 = data.find(item => item.mon === i && item.segmentName === 'Enterprise');
                let item2 = data.find(item => item.mon === i && item.segmentName === 'Mid');
                let item3 = data.find(item => item.mon === i && item.segmentName === 'SMB');
                temp_array = {
                    month: months[i - 1],
                    SMB: item3 ? item3.acv : 0,
                    Mid: item2 ? item2.acv : 0,
                    Enterprise: item1 ? item1.acv : 0
                }
                json_data.push(temp_array);
            }

            return { status: true, data: json_data };

        } catch (e) {
            return { status: false, error: e };
        }
    }

}

module.exports = ContractService;
