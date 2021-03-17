const ResponseFormat = require('../../core').ResponseFormat;
const db_headers = require("../../db/models").events_header;
const db_datas = require('../../db/models').events_weekly;
const moment = require('moment');


const getEventsWeeklies = async (req, res) => {
    try {
        const { timebase, company_id } = req.params;
        const tables = await db_headers.findOne({
            where: {
                company_Id: company_id
            }
        });
        let all_headers = tables.headers.split(',').slice(2, tables.length);
        let headers = all_headers.filter(item => item.includes('#'));
        const snapshot = await db_datas.findAll({
            where: {
                company_Id: company_id
            },
            order: [
                ['week_ending', 'ASC']
            ]
        });
        let tableHeader = null;
        let tableBody = null;
        if (timebase == "monthly")
            [tableBody, tableHeader] = await getSummaryData(timebase, headers, snapshot);
        // console.log(tableData)
        res.json({ tableHeader: tableHeader, tableBody: tableBody.slice(0, headers.length) })
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const getSummaryData = async (timebase, headers, snapshot) => {
    try {
        let companies = {};
        snapshot.map(data => {
            let other = data.other.split(',');
            other = other.slice(0, headers.length);
            if (!companies[data.week_ending]) companies[data.week_ending] = {};
            companies[data.week_ending][data.sheet_company_id] = other.map(val => parseInt(val));
        });

        let tableHeader = Object.keys(companies);

        tableHeader.map((date, index) => {
            for (let i = index + 1; i < tableHeader.length; i++) {
                let nextDateKeys = Object.keys(companies[tableHeader[i]]);
                Object.keys(companies[date]).map(item => {
                    if (!nextDateKeys.includes(item)) {
                        companies[tableHeader[i]][item] = companies[date][item];
                    }
                })
            }
        })

        let tableData = tableHeader.map(date => {
            let sum_data = {};
            Object.keys(companies[date]).map((key, index) => {
                if (index == 0) {
                    sum_data = companies[date][key];
                } else {
                    sum_data = sum_data.map((val, index1) => val + companies[date][key][index1])
                };
            })

            return sum_data;
        })

        tableData = headers.map((header, key) => {
            let row = [header];
            let prev_val = 0;
            tableData.map((item, index) => {
                if (index == 0) 
                    prev_val = item[key];
                else
                    row.push(item[key] - prev_val);
                prev_val = item[key];
            })
            return row
        })

        return [tableData, ["", ...tableHeader.slice(1, tableHeader.length)]];

    } catch (error) {
        console.log(error);
        throw new Error("Faild to get the Summary data");
    }
}

const getWeeklyTableData = async (timebase, headers, datas) => {
    try {
        let yearsData = {};
        let tableData = datas.map(data => {
            // let json_data = {};
            let other = data.other.split(',');
            if (!yearsData[data.sheet_company_id]) yearsData[data.sheet_company_id] = {};
            yearsData[data.sheet_company_id][data.week_ending] = other.map((val, index) => {
                if (headers[index].includes("#")) return parseInt(val);
            }).filter(item => item != undefined);
        });

        const com_id = 'f4f9f65b-87df-4740-b0c6-4d024880414f';

        let tableHeader = Object.keys(yearsData[com_id]);
        let tableBody = headers.map((header, index) => {
            let row = [header];
            let prev_val = 0;
            tableHeader.map((val, key) => {
                let current_val = row[key] != header ? yearsData[com_id][val][index] - prev_val : prev_val;
                row.push(current_val);
                prev_val = yearsData[com_id][val][index];
            })
            return row;
        })
        return [tableBody, ["", ...tableHeader]];
    } catch (error) {
        console.log(error);
        throw new Error("failed to get the table data!");
    }
}

const getBarChartEventsWeeklies = async (req, res) => {
    try {
        const { timebase, company_id } = req.params;
        const tables = await db_headers.findOne({
            where: {
                company_Id: company_id
            }
        });
        let all_headers = tables.headers.split(',').slice(2, tables.length);
        let headers = all_headers.filter(item => item.includes('#'));
        const snapshot = await db_datas.findAll({
            where: {
                company_Id: company_id
            },
            order: [
                ['week_ending', 'ASC']
            ]
        });

        let chartBody = null;
        if (timebase == "monthly")
            chartBody = await getWeeklyChartData(timebase, all_headers, snapshot);

        res.json({ chartBody })
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const getWeeklyChartData = async (timebase, headers, snapshot) => {
    try {
        let companies = {};
        snapshot.map(data => {
            let other = data.other.split(',');
            other = other.slice(0, headers.length);
            if (!companies[data.week_ending]) companies[data.week_ending] = {};
            companies[data.week_ending][data.sheet_company_id] = other.map(val => parseInt(val));
        });

        let tableHeader = Object.keys(companies);

        tableHeader.map((date, index) => {
            for (let i = index + 1; i < tableHeader.length; i++) {
                let nextDateKeys = Object.keys(companies[tableHeader[i]]);
                Object.keys(companies[date]).map(item => {
                    if (!nextDateKeys.includes(item)) {
                        companies[tableHeader[i]][item] = companies[date][item];
                    }
                })
            }
        })

        let tableData = tableHeader.map(date => {
            let sum_data = {};
            Object.keys(companies[date]).map((key, index) => {
                if (index == 0) {
                    sum_data = companies[date][key];
                } else {
                    sum_data = sum_data.map((val, index1) => val + companies[date][key][index1])
                };
            })

            return sum_data;
        })

        tableData = headers.map((header, key) => {
            let row = [];
            let prev_val = 0;
            tableData.map((item, index) => {
                if (index == 0) {
                    prev_val = item[key];
                    row.push(0)
                } else {
                    row.push(item[key] - prev_val);
                }
                prev_val = item[key];
            })
            return row
        })
        const formTotalKey = headers.indexOf('# Live Users');
        let prev_val = 0;
        console.log(tableData);
        let chartData = tableHeader.map((header, index) => {
            let chart_col = { 'month': header, 'PercentageShow': Math.floor(Math.random() * Math.floor(100)) + '%' };
            if (index == 0) {
                prev_val = 1;
                chart_col['value'] = '100';
            }

            else chart_col['value'] = parseInt(tableData[formTotalKey][index] / prev_val * 100);
            prev_val = tableData[formTotalKey][index];
            return chart_col;
        })

        return chartData;

    } catch (error) {
        console.log(error);
        throw new Error("Faild to get the Summary data");
    }
}


module.exports = {
    getEventsWeeklies,
    getBarChartEventsWeeklies
};
