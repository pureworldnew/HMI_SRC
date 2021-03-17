const userModel = require('../db/models').User;
const role = require('../db/models').Role;
const company = require('../db/models').Company;
const contract = require('../db/models').Contract;
const segments = require('../db/models').Segment;
const contracts_waterfall = require('../db/models').Contracts_waterfall;
const events_weekly = require('../db/models').events_weekly;
const events_header = require('../db/models').events_header;
const moment = require('moment');
var bcrypt = require("bcryptjs");
const ResponseFormat = require('../core').ResponseFormat;
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { contract_header,
    contracts_waterfall_header,
    segment_header
} = require('../enums/connections.enum');


const getEventsWeeklydata = async (doc, company) => {
    // console.log(company.id); return;
    console.time('find events weekly tab done')
    let eventsWeeklySheet = doc.sheetsByIndex.filter(sheets => sheets.title == "Events_Weekly")[0];
    console.timeEnd('find events weekly tab done');

    let eventsWeeklyRows = null;
    if (eventsWeeklySheet) {
        eventsWeeklyRows = await eventsWeeklySheet.getRows();
    }

    console.time('loadCell done')
    if (eventsWeeklySheet) await eventsWeeklySheet.loadCells();
    console.timeEnd('loadCell done')

    let eventsWeeklyData = [];
    const headerData = [
        {
            headers: eventsWeeklySheet.headerValues.join(','),
            types: "events_weekly",
            company_Id: company.id
        }
    ];

    if (eventsWeeklySheet) {
        eventsWeeklyRows.map(row => {
            let json_data = { "other": "" };
            eventsWeeklySheet.headerValues.map(header => {
                let element_value = row[header] ? row[header].toString() : "";
                if (header == "Company ID") json_data['sheet_company_id'] = element_value;
                else if (header == "Week Ending") json_data['week_ending'] = moment(element_value, 'M-DD-YYYY').format("YYYY-MM-DD");
                else {
                    json_data['other'] += element_value + ",";
                }
            })

            json_data['other'] = json_data['other'].slice(0, json_data['other'].length - 1);
            json_data['company_Id'] = company.id;
            eventsWeeklyData.push(json_data);
        })
    }

    return [eventsWeeklyData, headerData]
}


module.exports = {

    /**
     * Users
     */
    getUsersList(req, res) {
        let roleId = req.user.roleId;
        let companyId = req.user.companyId;

        if (roleId < 3) { // Master or System admin
            return userModel.findAll({
                include: [{
                    model: role,
                    as: 'role'
                }, {
                    model: company,
                    as: 'companies'
                }]
            })
                .then(users => {
                    res.status(200).json(ResponseFormat.build(
                        users,
                        "All User Information Reterive successfully",
                        200,
                        "success"
                    ))
                })
                .catch(error => res.status(400).send(ResponseFormat.build(
                    error,
                    "Somthing went wrong when Reterieve All User Information",
                    400,
                    "error"
                )));
        } else if (roleId == 3) { // logged in as company admin
            return userModel.findAll({
                include: [
                    'role',
                    'companies'
                ],
                where: { companyId: companyId }
            })
                .then(users => {
                    res.status(200).json(ResponseFormat.build(
                        users,
                        "Company Member List Reterive successfully",
                        200,
                        "success"
                    ))
                })
                .catch(error => res.status(400).send(ResponseFormat.build(
                    error,
                    "Somthing went wrong when Reterieve Company Member List",
                    400,
                    "error"
                )));
        }
    },

    getRoleList(req, res) {
        let roleId = req.user.roleId;

        if (roleId < 3) { // Master and system admin case
            return role
                .findAll({ // Master Admin, System Admin, Company Admin
                    attributes: [['id', 'value'], ['roleName', 'label']],
                    offset: 0,
                    limit: 3
                })
                .then(roles => {
                    res.status(200).json(ResponseFormat.build(
                        roles,
                        "Role List Reterive successfully",
                        200,
                        "success"
                    ))
                })
                .catch(error => res.status(400).send(ResponseFormat.build(
                    error,
                    "Somthing went wrong when Reterieve Information",
                    400,
                    "error"
                )));
        } else if (roleId === 3) { // Company admin case
            return role
                .findAll({ // CEO, VP Customer Success, Account Manager, Account Excutive
                    attributes: [['id', 'value'], ['roleName', 'label']],
                    offset: 3
                })
                .then(roles => {
                    res.status(200).json(ResponseFormat.build(
                        roles,
                        "Role List Reterive successfully",
                        200,
                        "success"
                    ))
                })
                .catch(error => res.status(400).send(ResponseFormat.build(
                    error,
                    "Somthing went wrong when Reterieve Information",
                    400,
                    "error"
                )));
        }
    },

    addNewUser(req, res) {
        let roleId = req.user.roleId; // get user's role id
        let companyId = req.user.companyId; // get user's company id

        if (roleId < 3) { // Master and system admin case
            return userModel
                .create({
                    userId: req.body.userId,
                    fullName: req.body.fullName,
                    emailAddress: req.body.email,
                    roleId: req.body.roleId,
                    password: bcrypt.hashSync(req.body.password, 10)
                })
                .then(user => {
                    res.status(201).json(ResponseFormat.build(
                        user,
                        "User Create Successfully",
                        201,
                        "success"
                    ))
                })
                .catch(error => res.status(400).json(ResponseFormat.error(
                    error,
                    "Something went wrong when create Users",
                    "error"
                )))
        } else if (roleId === 3) { // Company admin case
            return userModel
                .create({
                    userId: req.body.userId,
                    fullName: req.body.fullName,
                    emailAddress: req.body.email,
                    roleId: req.body.roleId,
                    companyId: companyId, // create companyId with company admin's company id
                    password: bcrypt.hashSync(req.body.password, 10),
                })
                .then(result => {
                    res.status(201).json(ResponseFormat.build(
                        result,
                        "User Create Successfully",
                        201,
                        "success"
                    ))
                })
                .catch(error => res.status(400).json(ResponseFormat.error(
                    error,
                    "Something went wrong when create Users",
                    "error"
                )))
        }
    },

    getAllUserList(req, res) {
        return userModel
            .findAll({
                include: ['role']
            })
            .then(users => res.status(200).json(ResponseFormat.build(
                users,
                "User Information Reterive successfully",
                200,
                "success"
            )))
            .catch(error => res.status(400).send(ResponseFormat.build(
                error,
                "Somthing went wrong when Reterieve Information",
                400,
                "error"
            )));
    },


    /**
     * Companies
     */
    companyUpdate(req, res) {
        return userModel.update(
            { companyId: null }, {
            where: { companyId: req.body.companyId }
        }).then(() => {
            console.log('successfully updated company id with null')
        }).catch((err) => {
            console.log('update company id err', err)
        }).then(() => {
            userModel.findAll({
                where: { id: req.body.companyMember }
            })
                .then((users) => {
                    for (var i = 0; i < users.length; i++) {
                        for (var j = 0; j < req.body.companyMember.length; j++) {
                            if (users[i].dataValues.id == req.body.companyMember[j]) {
                                users[i].update({
                                    companyId: req.body.companyId,
                                    roleId: req.body.MemberRoles[j]
                                })
                                    .then(() => console.log('Successfully updated company', j))
                                    .catch((error) => console.log('Error updated company', error));
                            }
                        }
                    }

                    userModel.findAll({
                        where: { id: req.body.companyMember },
                        include: [{
                            model: role,
                            as: 'role'
                        }]
                    })
                        .then((updated_result) => {
                            res.status(201).json(ResponseFormat.build(
                                updated_result,
                                "Company Create Successfully",
                                201,
                                "success"
                            ));
                        })
                        .catch(error => res.status(400).json(ResponseFormat.error(
                            error,
                            "Something went wrong when retrieve user",
                            "error"
                        )));

                })
                .catch(error => res.status(400).json(ResponseFormat.error(
                    error,
                    "Something went wrong when retrieve user",
                    "error"
                )));
        })
    },

    getCompanyList(req, res) {
        return company
            .all()
            .then(companies => res.status(200).json(ResponseFormat.build(
                companies,
                "Company Information Reterive successfully",
                200,
                "success"
            )))
            .catch(error => res.status(400).send(ResponseFormat.build(
                error,
                "Somthing went wrong when Reterieve Information",
                400,
                "error"
            )));
    },

    getCompanyById(req, res) {
        return company
            .findById(req.params.companyId, {
                include:
                    [{
                        model: userModel,
                        as: 'users',
                        include: [{
                            model: role,
                            as: 'role'
                        }]
                    }]
            })
            .then(companies => res.status(200).json(ResponseFormat.build(
                companies,
                "Company Information Reterive successfully",
                200,
                "success"
            )))
            .catch(error => res.status(400).send(ResponseFormat.build(
                error,
                "Somthing went wrong when Reterieve Information",
                400,
                "error"
            )));
    },

    companyCreate(req, res) {
        return company
            .create({
                companyName: req.body.companyName,
            })
            .then((company) => {
                userModel.findAll({
                    where: { id: req.body.companyMember },
                    include: [{
                        model: role,
                        as: 'role'
                    }]
                })
                    .then((users) => {
                        for (var i = 0; i < users.length; i++) {
                            for (var j = 0; j < req.body.companyMember.length; j++) {
                                if (users[i].dataValues.id == req.body.companyMember[j]) {
                                    users[i].update({
                                        companyId: req.body.companyId,
                                        companyId: company.id,
                                    })
                                        .then(() => console.log('Successfully created company', j))
                                        .catch((error) => console.log('Error created company', error));
                                }
                            }
                        }

                        userModel.findAll({
                            where: { id: req.body.companyMember },
                            include: [{
                                model: role,
                                as: 'role'
                            }]
                        })
                            .then((updated_users) => {
                                res.status(201).json(ResponseFormat.build(
                                    updated_users,
                                    "Company Create Successfully",
                                    201,
                                    "success"
                                ));
                            })
                            .catch(error => res.status(400).json(ResponseFormat.error(
                                error,
                                "Something went wrong when retrieve company members",
                                "error"
                            )));
                    })
                    .catch(error => res.status(400).json(ResponseFormat.error(
                        error,
                        "Something went wrong when update members",
                        "error"
                    )));

            })
            .catch(error => res.status(400).json(ResponseFormat.error(
                error,
                "Something went wrong when create Company",
                "error"
            )));
    },

    insertGoogleSheet(req, res) {
        // const company = await company.findOne({id: req.body.companyId});
        return company
            .findById(
                req.body.companyId,
            )
            .then((company) => {
                company.update({
                    googleSheet: req.body.googleSheetUrl
                })
                    .then(async (company) => {
                        try {
                            const parturl = company.googleSheet.split("/d/")[1];
                            const googleSheetId = parturl.split("/")[0];

                            // Initialize google sheet
                            console.time('initilize done')
                            const doc = new GoogleSpreadsheet(googleSheetId);
                            doc.useApiKey(company.googleApi);
                            await doc.loadInfo();
                            const sheet_count = doc.sheetCount;
                            let contractsSheet = null;
                            let contractsWaterfallSheet = null;
                            let segmentSheet = null;
                            let eventsWeeklySheet = null;
                            console.timeEnd('initilize done')

                            console.time("find contracts and contracts waterfall, segments tab done");

                            contractsSheet = doc.sheetsByIndex.filter(item => item.title === 'contracts')[0];
                            contractsWaterfallSheet = doc.sheetsByIndex.filter(item => item.title === 'contracts_waterfall')[0];
                            // segmentSheet = doc.sheetsByIndex.filter(item => item.title === 'segments')[0];
                            eventsWeeklySheet = doc.sheetsByIndex.filter(item => item.title === 'Events_Weekly')[0];

                            console.timeEnd("find contracts and contracts waterfall, segments tab done");

                            console.time('loadRows done')
                            let contractsSheetRows = null;
                            if (contractsSheet) {
                                contractsSheetRows = await contractsSheet.getRows();
                            }
                            console.log('Done contract sheet get rows')
                            if (contractsSheet) await contractsSheet.loadCells();
                            console.log('Done contract sheet load cells')

                            let contractsWaterfallSheetRows = null;
                            if (contractsWaterfallSheet) {
                                contractsWaterfallSheetRows = await contractsWaterfallSheet.getRows();
                            }
                            console.log('Done waterfall sheet get rows')

                            if (contractsWaterfallSheet) await contractsWaterfallSheet.loadCells();
                            console.log('Done waterfall sheet load cells')

                            let segmentSheetRows = null;
                            console.log('segmentSheet*******************',)
                            if (segmentSheet) {
                                segmentSheetRows = await segmentSheet.getRows();
                            }
                            console.log('Done segment sheet get rows')
                            
                            if (segmentSheet) await segmentSheet.loadCells();
                            console.log('Done segment sheet load cells')

                            let eventsWeeklyRows = null;
                            console.log('segmentSheet*******************',)
                            if (eventsWeeklySheet) {
                                eventsWeeklyRows = await eventsWeeklySheet.getRows();
                            }
                            console.log('Done segment sheet get rows')

                            if (eventsWeeklySheet) await eventsWeeklySheet.loadCells();
                            console.log('Done Events_weekly sheet load cells')

                            console.timeEnd('loadRows done')

                            // Load data for contracts sheet
                            console.time('load data for contracts done')
                            var contractsSheetData = [];
                            if (contractsSheetRows) {
                                for (let i = 0; i < contractsSheetRows.length; i++) {
                                    var json_data = {};
                                    for (let j = 0; j < contractsSheet.headerValues.length; j++) {
                                        let element_header = contractsSheet.headerValues[j].replace(/[^A-Z0-9]/ig, "");
                                        if (contract_header.indexOf(element_header) > -1) { // ignore for not existing in columns
                                            let element_value = contractsSheetRows[i][contractsSheet.headerValues[j]] ? contractsSheetRows[i][contractsSheet.headerValues[j]].toString() : " ";
                                            // remove $, . characters
                                            if (element_header === "CurrentARR" ||
                                                element_header === "AnnualContractValue"
                                            ) {
                                                element_value = element_value.split(".")[0];
                                                element_value = element_value.replace(/[^A-Z0-9]/ig, "")
                                            }
                                            json_data[element_header] = element_value;
                                        }

                                    }
                                    json_data.company_Id = req.body.companyId;
                                    contractsSheetData.push(json_data);
                                }
                            }
                            console.timeEnd('load data for contracts done')

                            // Load data for contracts_waterfall sheet
                            console.time('load data for contreact waterfall done')
                            var contractsWaterfallSheetData = [];
                            if (contractsWaterfallSheetRows) {
                                for (let k = 0; k < contractsWaterfallSheetRows.length; k++) {
                                    var json_data = {};
                                    for (let l = 0; l < contractsWaterfallSheet.headerValues.length; l++) {
                                        let element_header = contractsWaterfallSheet.headerValues[l].replace(/[^A-Z0-9]/ig, "");
                                        if (contracts_waterfall_header.indexOf(element_header) > -1) {
                                            let element_value = contractsWaterfallSheetRows[k][contractsWaterfallSheet.headerValues[l]] ? contractsWaterfallSheetRows[k][contractsWaterfallSheet.headerValues[l]].toString() : " ";
                                            // remove $, . characters
                                            if (element_header === "CurrentARR" ||
                                                element_header === "AnnualContractValue" ||
                                                element_header === "MonthlyValue" ||
                                                element_header === "Jan2019" ||
                                                element_header === "Feb2019" ||
                                                element_header === "Mar2019" ||
                                                element_header === "Apr2019" ||
                                                element_header === "May2019" ||
                                                element_header === "Jun2019" ||
                                                element_header === "Jul2019" ||
                                                element_header === "Aug2019" ||
                                                element_header === "Sep2019" ||
                                                element_header === "Oct2019" ||
                                                element_header === "Nov2019" ||
                                                element_header === "Dec2019" ||
                                                element_header === "Jan2020" ||
                                                element_header === "Feb2020" ||
                                                element_header === "Mar2020" ||
                                                element_header === "Apr2020" ||
                                                element_header === "May2020" ||
                                                element_header === "Jun2020" ||
                                                element_header === "Jul2020" ||
                                                element_header === "Aug2020" ||
                                                element_header === "Sep2020" ||
                                                element_header === "Oct2020" ||
                                                element_header === "Nov2020" ||
                                                element_header === "Dec2020" ||
                                                element_header === "Jan2021" ||
                                                element_header === "Feb2021" ||
                                                element_header === "Mar2021" ||
                                                element_header === "Apr2021" ||
                                                element_header === "May2021" ||
                                                element_header === "Jun2021" ||
                                                element_header === "Jul2021" ||
                                                element_header === "Aug2021" ||
                                                element_header === "Sep2021" ||
                                                element_header === "Oct2021" ||
                                                element_header === "Nov2021" ||
                                                element_header === "Dec2021"
                                            ) {
                                                element_value = element_value.split(".")[0];
                                                element_value = element_value.replace(/[^A-Z0-9]/ig, "")
                                            }
                                            json_data[element_header] = element_value;
                                        }
                                    }
                                    json_data.company_Id = req.body.companyId;

                                    contractsWaterfallSheetData.push(json_data);
                                }
                            }
                            console.timeEnd('load data for contreact waterfall done')

                            // Load data for segments sheet
                            console.time('load data for segments done')
                            var segmentSheetData = [];
                            if (segmentSheetRows) {
                                for (let i = 0; i < segmentSheetRows.length; i++) {
                                    var json_data = {};
                                    for (let j = 0; j < segmentSheet.headerValues.length; j++) {
                                        let element_header = segmentSheet.headerValues[j].replace(/[^A-Z0-9]/ig, "");
                                        if (segment_header.indexOf(element_header) > -1) { // ignore for not existing in columns
                                            let element_value = segmentSheetRows[i][segmentSheet.headerValues[j]] ? segmentSheetRows[i][segmentSheet.headerValues[j]].toString() : " ";
                                            // remove $, . characters
                                            if (element_header === "LowValue" ||
                                                element_header === "HighValue" ||
                                                element_header === "MonthlyLowValue" ||
                                                element_header === "MonthlyHighValue"
                                            ) {
                                                element_value = element_value.split(".")[0];
                                                element_value = element_value.replace(/[^A-Z0-9]/ig, "")
                                            }
                                            if (element_header === "SegmentName") {
                                                element_value = element_value.replace(/[^A-Z0-9]/ig, "")
                                            }
                                            json_data[element_header] = element_value;
                                        }

                                    }
                                    json_data.company_Id = req.body.companyId;
                                    segmentSheetData.push(json_data);
                                }
                            }

                            let eventsWeeklyData = [];
                            let eventsHeaderData = eventsWeeklyRows ? [
                                {
                                    headers: eventsWeeklySheet.headerValues.join(','),
                                    types: "events_weekly",
                                    company_Id: company.id
                                }
                            ] : [];


                            if (eventsWeeklyRows) {
                                eventsWeeklyRows.map(row => {
                                    let json_data = { "other": "" };
                                    eventsWeeklySheet.headerValues.map(header => {
                                        let element_value = row[header] ? row[header].toString() : "";
                                        if (header == "Company ID") json_data['sheet_company_id'] = element_value;
                                        else if (header == "Week Ending") json_data['week_ending'] = moment(element_value, 'M-DD-YYYY').format("YYYY-MM-DD");
                                        else {
                                            json_data['other'] += element_value + ",";
                                        }
                                    })

                                    json_data['other'] = json_data['other'].slice(0, json_data['other'].length - 1);
                                    json_data['company_Id'] = company.id;
                                    eventsWeeklyData.push(json_data);
                                })
                            }
                            console.log("Done Events sheet load cells");
                            console.timeEnd('load data for segments done')
                            

                            contract.bulkCreate(contractsSheetData)
                            .then(() => {
                                contracts_waterfall.bulkCreate(contractsWaterfallSheetData)
                                    .then(() => {
                                        segments.bulkCreate(segmentSheetData)
                                            .then(() => {
                                                events_header.bulkCreate(eventsHeaderData)
                                                    .then(() => {
                                                        events_weekly.bulkCreate(eventsWeeklyData)
                                                            .then(() => {
                                                                res.status(201).json(ResponseFormat.build(
                                                                    company,
                                                                    "GoogleSheet inserted Successfully",
                                                                    201,
                                                                    "success"
                                                                ))
                                                            })
                                                            .catch(error => res.status(400).send(ResponseFormat.build(
                                                                error,
                                                                "Insert error to events_weekly",
                                                                400,
                                                                "error"
                                                            )))
                                                    })
                                                    .catch(error => res.status(400).send(ResponseFormat.build(
                                                        error,
                                                        "Insert error to events_weekly header",
                                                        400,
                                                        "error"
                                                    )))
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                res.status(400).send(ResponseFormat.build(
                                                    error,
                                                    "Insert error to segments",
                                                    400,
                                                    "error"
                                                ))
                                            })
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        res.status(400).send(ResponseFormat.build(
                                            error,
                                            "Insert error to contracts_waterfall",
                                            400,
                                            "error"
                                        ))
                                    })
                            })
                            .catch(error => res.status(400).send(ResponseFormat.build(
                                error,
                                "Insert error to contracts",
                                400,
                                "error"
                            )))

                            
                            
                            // res.sendStatus(200);
                        } catch (error) {
                            console.log(error);
                            res.status(400).send(ResponseFormat.build(
                                error,
                                "Interval Server Error",
                                400,
                                "error"
                            ))
                        }
                    }).catch(error => {
                        console.log(error);
                        res.status(400).json(ResponseFormat.error(
                            error,
                            "Update error in company google sheet",
                            "error"
                        ))
                    });
            })
            .catch(error => res.status(400).json(ResponseFormat.error(
                error,
                "Company find error",
                "error"
            )));
    },


    /**
     * Connections
     */
    insertGoogleSheet1(req, res) {
        return company
            .findById(
                req.body.companyId,
            )
            .then((company) => {
                company.update({
                    googleSheet: req.body.googleSheetUrl
                })
                    .then(async (company) => {
                        // Get google sheet id
                        var parturl = company.googleSheet.split("/d/")[1];
                        var googleSheetId = parturl.split("/")[0];

                        // Initialize google sheet
                        console.time('initilize done')
                        var doc = new GoogleSpreadsheet(googleSheetId);
                        doc.useApiKey(company.googleApi);
                        await doc.loadInfo();
                        var sheet_count = doc.sheetCount;
                        var contractsSheet = null;
                        var contractsWaterfallSheet = null;
                        var segmentSheet = null;

                        const [eventsWeeklyData, eventsHeaderData] = await getEventsWeeklydata(doc, company);
                        console.timeEnd('initilize done')

                        // Find contracts and contracts_waterfall tab
                        console.time('find contracts and contracts waterfall, segments tab done')
                        for (let m = 0; m < sheet_count; m++) {
                            if (doc.sheetsByIndex[m].title === "contracts") contractsSheet = doc.sheetsByIndex[m];
                            if (doc.sheetsByIndex[m].title === "contracts_waterfall") contractsWaterfallSheet = doc.sheetsByIndex[m];
                            if (doc.sheetsByIndex[m].title === "segments") segmentSheet = doc.sheetsByIndex[m];
                        }
                        console.timeEnd('find contracts and contracts waterfall, segments tab done')

                        console.time('loadRows done')
                        var contractsSheetRows = null;
                        if (contractsSheet) {
                            contractsSheetRows = await contractsSheet.getRows();
                        }
                        console.log('Done contract sheet get rows')
                        var contractsWaterfallSheetRows = null;
                        if (contractsWaterfallSheet) {
                            contractsWaterfallSheetRows = await contractsWaterfallSheet.getRows();
                        }
                        console.log('Done waterfall sheet get rows')
                        var segmentSheetRows = null;
                        console.log('segmentSheet*******************', segmentSheet)
                        if (segmentSheet) {
                            segmentSheetRows = await segmentSheet.getRows();
                        }
                        console.log('Done segment sheet get rows')
                        console.timeEnd('loadRows done')

                        console.time('loadCell done')
                        if (contractsSheet) await contractsSheet.loadCells();
                        console.log('Done contract sheet load cells')
                        if (contractsWaterfallSheet) await contractsWaterfallSheet.loadCells();
                        console.log('Done waterfall sheet load cells')
                        if (segmentSheet) await segmentSheet.loadCells();
                        console.log('Done segment sheet load cells')
                        console.timeEnd('loadCell done')

                        // Load data for contracts sheet
                        console.time('load data for contracts done')
                        var contractsSheetData = [];
                        if (contractsSheetRows) {
                            for (let i = 0; i < contractsSheetRows.length; i++) {
                                var json_data = {};
                                for (let j = 0; j < contractsSheet.headerValues.length; j++) {
                                    let element_header = contractsSheet.headerValues[j].replace(/[^A-Z0-9]/ig, "");
                                    if (contract_header.indexOf(element_header) > -1) { // ignore for not existing in columns
                                        let element_value = contractsSheetRows[i][contractsSheet.headerValues[j]] ? contractsSheetRows[i][contractsSheet.headerValues[j]].toString() : " ";
                                        // remove $, . characters
                                        if (element_header === "CurrentARR" ||
                                            element_header === "AnnualContractValue"
                                        ) {
                                            element_value = element_value.split(".")[0];
                                            element_value = element_value.replace(/[^A-Z0-9]/ig, "")
                                        }
                                        json_data[element_header] = element_value;
                                    }

                                }
                                json_data.company_Id = req.body.companyId;
                                contractsSheetData.push(json_data);
                            }
                        }
                        console.timeEnd('load data for contracts done')

                        // Load data for contracts_waterfall sheet
                        console.time('load data for contreact waterfall done')
                        var contractsWaterfallSheetData = [];
                        if (contractsWaterfallSheetRows) {
                            for (let k = 0; k < contractsWaterfallSheetRows.length; k++) {
                                var json_data = {};
                                for (let l = 0; l < contractsWaterfallSheet.headerValues.length; l++) {
                                    let element_header = contractsWaterfallSheet.headerValues[l].replace(/[^A-Z0-9]/ig, "");
                                    if (contracts_waterfall_header.indexOf(element_header) > -1) {
                                        let element_value = contractsWaterfallSheetRows[k][contractsWaterfallSheet.headerValues[l]] ? contractsWaterfallSheetRows[k][contractsWaterfallSheet.headerValues[l]].toString() : " ";
                                        // remove $, . characters
                                        if (element_header === "CurrentARR" ||
                                            element_header === "AnnualContractValue" ||
                                            element_header === "MonthlyValue" ||
                                            element_header === "Jan2019" ||
                                            element_header === "Feb2019" ||
                                            element_header === "Mar2019" ||
                                            element_header === "Apr2019" ||
                                            element_header === "May2019" ||
                                            element_header === "Jun2019" ||
                                            element_header === "Jul2019" ||
                                            element_header === "Aug2019" ||
                                            element_header === "Sep2019" ||
                                            element_header === "Oct2019" ||
                                            element_header === "Nov2019" ||
                                            element_header === "Dec2019" ||
                                            element_header === "Jan2020" ||
                                            element_header === "Feb2020" ||
                                            element_header === "Mar2020" ||
                                            element_header === "Apr2020" ||
                                            element_header === "May2020" ||
                                            element_header === "Jun2020" ||
                                            element_header === "Jul2020" ||
                                            element_header === "Aug2020" ||
                                            element_header === "Sep2020" ||
                                            element_header === "Oct2020" ||
                                            element_header === "Nov2020" ||
                                            element_header === "Dec2020" ||
                                            element_header === "Jan2021" ||
                                            element_header === "Feb2021" ||
                                            element_header === "Mar2021" ||
                                            element_header === "Apr2021" ||
                                            element_header === "May2021" ||
                                            element_header === "Jun2021" ||
                                            element_header === "Jul2021" ||
                                            element_header === "Aug2021" ||
                                            element_header === "Sep2021" ||
                                            element_header === "Oct2021" ||
                                            element_header === "Nov2021" ||
                                            element_header === "Dec2021"
                                        ) {
                                            element_value = element_value.split(".")[0];
                                            element_value = element_value.replace(/[^A-Z0-9]/ig, "")
                                        }
                                        json_data[element_header] = element_value;
                                    }
                                }
                                json_data.company_Id = req.body.companyId;

                                contractsWaterfallSheetData.push(json_data);
                            }
                        }
                        console.timeEnd('load data for contreact waterfall done')

                        // Load data for segments sheet
                        console.time('load data for segments done')
                        var segmentSheetData = [];
                        if (segmentSheetRows) {
                            for (let i = 0; i < segmentSheetRows.length; i++) {
                                var json_data = {};
                                for (let j = 0; j < segmentSheet.headerValues.length; j++) {
                                    let element_header = segmentSheet.headerValues[j].replace(/[^A-Z0-9]/ig, "");
                                    if (segment_header.indexOf(element_header) > -1) { // ignore for not existing in columns
                                        let element_value = segmentSheetRows[i][segmentSheet.headerValues[j]] ? segmentSheetRows[i][segmentSheet.headerValues[j]].toString() : " ";
                                        // remove $, . characters
                                        if (element_header === "LowValue" ||
                                            element_header === "HighValue" ||
                                            element_header === "MonthlyLowValue" ||
                                            element_header === "MonthlyHighValue"
                                        ) {
                                            element_value = element_value.split(".")[0];
                                            element_value = element_value.replace(/[^A-Z0-9]/ig, "")
                                        }
                                        if (element_header === "SegmentName") {
                                            element_value = element_value.replace(/[^A-Z0-9]/ig, "")
                                        }
                                        json_data[element_header] = element_value;
                                    }

                                }
                                json_data.company_Id = req.body.companyId;
                                segmentSheetData.push(json_data);
                            }
                        }
                        console.timeEnd('load data for segments done')

                        contract.bulkCreate(contractsSheetData)
                            .then(() => {
                                contracts_waterfall.bulkCreate(contractsWaterfallSheetData)
                                    .then(() => {
                                        segments.bulkCreate(segmentSheetData)
                                            .then(() => {
                                                events_header.bulkCreate(eventsHeaderData)
                                                    .then(() => {
                                                        events_weekly.bulkCreate(eventsWeeklyData)
                                                            .then(() => {
                                                                res.status(201).json(ResponseFormat.build(
                                                                    company,
                                                                    "GoogleSheet inserted Successfully",
                                                                    201,
                                                                    "success"
                                                                ))
                                                            })
                                                            .catch(error => res.status(400).send(ResponseFormat.build(
                                                                error,
                                                                "Insert error to events_weekly",
                                                                400,
                                                                "error"
                                                            )))
                                                    })
                                                    .catch(error => res.status(400).send(ResponseFormat.build(
                                                        error,
                                                        "Insert error to events_weekly header",
                                                        400,
                                                        "error"
                                                    )))
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                res.status(400).send(ResponseFormat.build(
                                                    error,
                                                    "Insert error to segments",
                                                    400,
                                                    "error"
                                                ))
                                            })
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        res.status(400).send(ResponseFormat.build(
                                            error,
                                            "Insert error to contracts_waterfall",
                                            400,
                                            "error"
                                        ))
                                    })
                            })
                            .catch(error => res.status(400).send(ResponseFormat.build(
                                error,
                                "Insert error to contracts",
                                400,
                                "error"
                            )))
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(400).json(ResponseFormat.error(
                            error,
                            "Update error in company google sheet",
                            "error"
                        ))
                    });
            })
            .catch(error => res.status(400).json(ResponseFormat.error(
                error,
                "Company find error",
                "error"
            )));
    },

    updateApi(req, res) {
        return company
            .findById(
                req.body.companyId,
            )
            .then((company) => {
                company.update({
                    googleApi: req.body.googleApi
                })
                    .then((company) => {
                        res.status(201).json(ResponseFormat.build(
                            company,
                            "GoogleApi inserted Successfully",
                            201,
                            "success"
                        ))
                    })
            })
            .catch(error => res.status(400).json(ResponseFormat.error(
                error,
                "Something went wrong when insert Google APi",
                "error"
            )));
    },

    removeGoogleSheet(req, res) {
        return company
            .findById(
                req.params.companyId,
            )
            .then((company) => {
                company.update({
                    googleSheet: ""
                })
                    .then(async (company) => {
                        await contract.destroy({
                            where: {
                                company_Id: req.params.companyId
                            }
                        })
                            .then(() => {
                                contracts_waterfall.destroy({
                                    where: {
                                        company_Id: req.params.companyId
                                    }
                                })
                                    .then(() => {
                                        segments.destroy({
                                            where: {
                                                company_Id: req.params.companyId
                                            }
                                        })
                                            .then(async () => {
                                                await events_weekly.destroy({ where: { company_Id: req.params.companyId } });
                                                await events_header.destroy({
                                                    where: {
                                                        company_Id: req.params.companyId,
                                                        types: "events_weekly"
                                                    }
                                                });
                                                res.status(201).json(ResponseFormat.build(
                                                    company,
                                                    "Successfully removed!",
                                                    201,
                                                    "success"
                                                ))
                                            })

                                    });
                            })
                    })
            })
            .catch(error => res.status(400).json(ResponseFormat.error(
                error,
                "Something went wrong when remove GoogleSheet",
                "error"
            )));
    },

    updateGoogleSheet(req, res) {
        return company
            .findById(
                req.body.companyId,
            )
            .then((company) => {
                company.update({
                    googleSheet: req.body.googleSheetUrl
                })
                    .then(async (company) => {
                        // Delete old data
                        contract.destroy({
                            where: {
                                company_Id: req.body.companyId
                            }
                        })
                        contracts_waterfall.destroy({
                            where: {
                                company_Id: req.body.companyId
                            }
                        })
                        segments.destroy({
                            where: {
                                company_Id: req.body.companyId
                            }
                        })
                        console.log('Done removing old data')

                        // Get google sheet id
                        var parturl = company.googleSheet.split("/d/")[1];
                        var googleSheetId = parturl.split("/")[0];

                        // Initialize google sheet
                        console.time('initilize done')
                        var doc = new GoogleSpreadsheet(googleSheetId);
                        doc.useApiKey(company.googleApi);
                        await doc.loadInfo();
                        var sheet_count = doc.sheetCount;
                        var contractsSheet = null;
                        var contractsWaterfallSheet = null;
                        var segmentSheet = null;
                        console.timeEnd('initilize done')

                        // Find contracts and contracts_waterfall tab
                        console.time('find contracts and contracts waterfall, segments tab done')
                        for (let m = 0; m < sheet_count; m++) {
                            if (doc.sheetsByIndex[m].title === "contracts") contractsSheet = doc.sheetsByIndex[m];
                            if (doc.sheetsByIndex[m].title === "contracts_waterfall") contractsWaterfallSheet = doc.sheetsByIndex[m];
                            if (doc.sheetsByIndex[m].title === "segments") segmentSheet = doc.sheetsByIndex[m];
                        }
                        console.timeEnd('find contracts and contracts waterfall, segments tab done')

                        console.time('loadRows done')
                        var contractsSheetRows = null;
                        if (contractsSheet) {
                            contractsSheetRows = await contractsSheet.getRows();
                        }
                        console.log('Done contract sheet get rows')
                        var contractsWaterfallSheetRows = null;
                        if (contractsWaterfallSheet) {
                            contractsWaterfallSheetRows = await contractsWaterfallSheet.getRows();
                        }
                        console.log('Done waterfall sheet get rows')
                        var segmentSheetRows = null;
                        if (segmentSheet) {
                            segmentSheetRows = await segmentSheet.getRows();
                        }
                        console.log('Done segment sheet get rows')
                        console.timeEnd('loadRows done')

                        console.time('loadCell done')
                        if (contractsSheet) await contractsSheet.loadCells();
                        console.log('Done contract sheet load cells')
                        if (contractsWaterfallSheet) await contractsWaterfallSheet.loadCells();
                        console.log('Done waterfall sheet load cells')
                        if (segmentSheet) await segmentSheet.loadCells();
                        console.log('Done segment sheet load cells')
                        console.timeEnd('loadCell done')

                        // Load data for contracts sheet
                        console.time('load data for contracts done')
                        var contractsSheetData = [];
                        if (contractsSheetRows) {
                            for (let i = 0; i < contractsSheetRows.length; i++) {
                                var json_data = {};
                                for (let j = 0; j < contractsSheet.headerValues.length; j++) {
                                    let element_header = contractsSheet.headerValues[j].replace(/[^A-Z0-9]/ig, "");
                                    if (contract_header.indexOf(element_header) > -1) { // ignore for not existing in columns
                                        let element_value = contractsSheetRows[i][contractsSheet.headerValues[j]] ? contractsSheetRows[i][contractsSheet.headerValues[j]].toString() : " ";
                                        // remove $, . characters
                                        if (element_header === "CurrentARR" ||
                                            element_header === "AnnualContractValue" ||
                                            element_header === "TotalContractValue"
                                        ) {
                                            element_value = element_value.split(".")[0];
                                            element_value = element_value.replace(/[^A-Z0-9]/ig, "")
                                        }
                                        json_data[element_header] = element_value;
                                    }

                                }
                                json_data.company_Id = req.body.companyId;
                                contractsSheetData.push(json_data);
                            }
                        }
                        console.timeEnd('load data for contracts done')

                        // Load data for contracts_waterfall sheet
                        console.time('load data for contreact waterfall done')
                        var contractsWaterfallSheetData = [];
                        if (contractsWaterfallSheetRows) {
                            for (let k = 0; k < contractsWaterfallSheetRows.length; k++) {
                                var json_data = {};
                                for (let l = 0; l < contractsWaterfallSheet.headerValues.length; l++) {
                                    let element_header = contractsWaterfallSheet.headerValues[l].replace(/[^A-Z0-9]/ig, "");
                                    if (contracts_waterfall_header.indexOf(element_header) > -1) {
                                        let element_value = contractsWaterfallSheetRows[k][contractsWaterfallSheet.headerValues[l]] ? contractsWaterfallSheetRows[k][contractsWaterfallSheet.headerValues[l]].toString() : " ";
                                        // remove $, . characters
                                        if (element_header === "CurrentARR" ||
                                            element_header === "AnnualContractValue" ||
                                            element_header === "MonthlyValue" ||
                                            element_header === "Jan2019" ||
                                            element_header === "Feb2019" ||
                                            element_header === "Mar2019" ||
                                            element_header === "Apr2019" ||
                                            element_header === "May2019" ||
                                            element_header === "Jun2019" ||
                                            element_header === "Jul2019" ||
                                            element_header === "Aug2019" ||
                                            element_header === "Sep2019" ||
                                            element_header === "Oct2019" ||
                                            element_header === "Nov2019" ||
                                            element_header === "Dec2019" ||
                                            element_header === "Jan2020" ||
                                            element_header === "Feb2020" ||
                                            element_header === "Mar2020" ||
                                            element_header === "Apr2020" ||
                                            element_header === "May2020" ||
                                            element_header === "Jun2020" ||
                                            element_header === "Jul2020" ||
                                            element_header === "Aug2020" ||
                                            element_header === "Sep2020" ||
                                            element_header === "Oct2020" ||
                                            element_header === "Nov2020" ||
                                            element_header === "Dec2020" ||
                                            element_header === "Jan2021" ||
                                            element_header === "Feb2021" ||
                                            element_header === "Mar2021" ||
                                            element_header === "Apr2021" ||
                                            element_header === "May2021" ||
                                            element_header === "Jun2021" ||
                                            element_header === "Jul2021" ||
                                            element_header === "Aug2021" ||
                                            element_header === "Sep2021" ||
                                            element_header === "Oct2021" ||
                                            element_header === "Nov2021" ||
                                            element_header === "Dec2021"
                                        ) {
                                            element_value = element_value.split(".")[0];
                                            element_value = element_value.replace(/[^A-Z0-9]/ig, "")
                                        }
                                        json_data[element_header] = element_value;
                                    }
                                }
                                json_data.company_Id = req.body.companyId;

                                contractsWaterfallSheetData.push(json_data);
                            }
                        }
                        console.timeEnd('load data for contreact waterfall done')

                        // Load data for segments sheet
                        console.time('load data for segments done')
                        var segmentSheetData = [];
                        if (segmentSheetRows) {
                            for (let i = 0; i < segmentSheetRows.length; i++) {
                                var json_data = {};
                                for (let j = 0; j < segmentSheet.headerValues.length; j++) {
                                    let element_header = segmentSheet.headerValues[j].replace(/[^A-Z0-9]/ig, "");
                                    if (segment_header.indexOf(element_header) > -1) { // ignore for not existing in columns
                                        let element_value = segmentSheetRows[i][segmentSheet.headerValues[j]] ? segmentSheetRows[i][segmentSheet.headerValues[j]].toString() : " ";
                                        // remove $, . characters
                                        if (element_header === "LowValue" ||
                                            element_header === "HighValue" ||
                                            element_header === "MonthlyLowValue" ||
                                            element_header === "MonthlyHighValue"
                                        ) {
                                            element_value = element_value.split(".")[0];
                                            element_value = element_value.replace(/[^A-Z0-9]/ig, "")
                                        }
                                        if (element_header === "SegmentName") {
                                            element_value = element_value.replace(/[^A-Z0-9]/ig, "")
                                        }
                                        json_data[element_header] = element_value;
                                    }

                                }
                                json_data.company_Id = req.body.companyId;
                                segmentSheetData.push(json_data);
                            }
                        }
                        console.timeEnd('load data for segments done')

                        contract.bulkCreate(contractsSheetData)
                            .then(() => {
                                contracts_waterfall.bulkCreate(contractsWaterfallSheetData)
                                    .then(() => {
                                        segments.bulkCreate(segmentSheetData)
                                            .then(() => {
                                                res.status(201).json(ResponseFormat.build(
                                                    company,
                                                    "GoogleSheet inserted Successfully",
                                                    201,
                                                    "success"
                                                ))
                                            })
                                            .catch(error => res.status(400).send(ResponseFormat.build(
                                                error,
                                                "Insert error to segments",
                                                400,
                                                "error"
                                            )))
                                    })
                                    .catch(error => res.status(400).send(ResponseFormat.build(
                                        error,
                                        "Insert error to contracts_waterfall",
                                        400,
                                        "error"
                                    )))
                            })
                            .catch(error => res.status(400).send(ResponseFormat.build(
                                error,
                                "Insert error to contracts",
                                400,
                                "error"
                            )))
                    })
                    .catch(error => res.status(400).json(ResponseFormat.error(
                        error,
                        "Update error in company google sheet",
                        "error"
                    )));
            })
            .catch(error => res.status(400).json(ResponseFormat.error(
                error,
                "Company find error",
                "error"
            )));
    },

}
