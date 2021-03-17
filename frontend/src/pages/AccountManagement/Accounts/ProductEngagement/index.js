import React, { useState, useRef, useEffect } from "react";
import {
    Menu, MenuItem, List, ListItem,
    ListItemText, Divider, IconButton
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Switch from '@material-ui/core/Switch';
import loadingGif from '../../../../assets/gif/loading.gif';


import { CustomBarChart, CustomBarChartLegend } from '../../../../components/BarChart';
import Table from '../../../RevenueManagement/Overview/Table';
import {
    AM_period_chart, AM_account_chart, AM_account_manager_chart,
    AM_account_period_chart, AM_account_manager_period_chart,
    AM_period_dataTable, AM_period_dataTable_header,
    AM_period_dataTableSpacing, AM_account_dataTable,
    AM_account_dataTable_header, AM_account_dataTableSpacing,
    AM_account_manager_dataTable, AM_account_manager_dataTable_header,
    AM_account_manager_dataTableSpacing
} from "../../../../utils/Utils";
import SummaryCharts from './SummaryCharts';
import { ExportToJPG } from '../../../../components/ContextMenu';

import AccountService from '../../../../services/AccountService';





const ProductEngagement = (props) => {
    // colors for chart bars, this con be randomized to get the colors for the bars
    let colorBarStack = ['#333', '#626060', '#777', '#8c8686', '#a79d9d'];
    let mockData = {
        period: AM_period_chart,
        account: AM_account_chart,
        account_manager: AM_account_manager_chart,
        account_by_period: AM_account_period_chart,
        account_manager_by_period: AM_account_manager_period_chart
    };
    let tableMockData = {
        header: {
            period: AM_period_dataTable_header,
            account: AM_account_dataTable_header,
            account_manager: AM_account_manager_dataTable_header,
            account_by_period: AM_period_dataTable_header,
            account_manager_by_period: AM_period_dataTable_header
        },
        spacing: {
            period: AM_period_dataTableSpacing,
            account: AM_account_dataTableSpacing,
            account_manager: AM_account_manager_dataTableSpacing,
            account_by_period: AM_period_dataTableSpacing,
            account_manager_by_period: AM_period_dataTableSpacing
        },
        data: {
            period: AM_period_dataTable,
            account: AM_account_dataTable,
            account_manager: AM_account_manager_dataTable,
            account_by_period: AM_period_dataTable,
            account_manager_by_period: AM_period_dataTable
        }
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const [barChartView, setBarChartView] = useState(true);
    const [percentage_show, setpercentage_show] = useState();
    const [summaryShow, setSummary] = useState(false);
    const [tableData, setTableData] = useState(tableMockData);
    const [chartData, setChartData] = useState(mockData);
    const [pageLoading, setPageLoading] = useState(false);
    const containerRef = useRef();

    useEffect(() => {
        const companyId = window.localStorage.getItem('companyId');
        setPageLoading(true);
        try {
            AccountService.getEventsWeeklyBarChartsData(props.timeBase, companyId, handleChartDataChange);
        } catch (error) {
            setPageLoading(false);
        }
    }, []);

    const handleTableDataChange = (data) => {
        tableMockData.data.period = data.tableBody;
        tableMockData.header.period = data.tableHeader;
        let spacing = "2fr";
        for (let i = 1; i < data.tableHeader.length; i++) {
            spacing += ' 1fr';
        }
        console.log(spacing);
        tableMockData.spacing.period = spacing;
        setTableData(tableMockData);
        setPageLoading(false);
    }

    const handleChartDataChange = (data) => {
        let bufChart = chartData;
        bufChart.period = data.chartBody;
        setChartData(bufChart);
        setPageLoading(false);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSummary = (event) => {
        setSummary(!summaryShow);
        setAnchorEl(null);
    };

    const handleChange = event => {
        setpercentage_show(event.target.checked);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleChartView = () => {
        const companyId = window.localStorage.getItem('companyId');
        setPageLoading(true);
        try {
            barChartView ? AccountService.getEventsWeeklyData(props.timeBase, companyId, handleTableDataChange) :
                AccountService.getEventsWeeklyBarChartsData(props.timeBase, companyId, handleChartDataChange);
        } catch (error) {
            console.log(error);
            setPageLoading(false)
        }
        setBarChartView(!barChartView);
        setTimeout(() => {
            handleClose();
        }, 500);
    };

    return (
        <div className="barChartContainer" ref={containerRef} style={{ alignItems: 'flex-start' }}>
            <div className="barChart__header">
                <h3 style={{ fontSize: "1.8rem" }}>Product Engagement</h3>
                <div className="barChart__legend" >
                    <div style={{ display: 'flex' }}>
                        {barChartView && <CustomBarChartLegend key="chart-legend" colors={colorBarStack} data={mockData[props.viewMode] ? mockData[props.viewMode] : []} />}

                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    </div>

                    <Menu key="chart-menu"
                        id="chart-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >

                        <List component="nav" className="context-menu" aria-label="secondary mailbox folders">
                            <MenuItem onClick={handleClose}>
                                <ListItemText primary="Export To" />
                            </MenuItem>
                            <ExportToJPG elementToConvert={containerRef} imageName="Product Engagement" handleClose={handleClose} />
                            <MenuItem onClick={handleClose}>
                                <ListItemText primary="XLSX" />
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemText primary="Google Sheet" />
                            </MenuItem>
                            <Divider hidden={!barChartView} />
                            <MenuItem style={{ display: "block" }} hidden={!barChartView}>
                                <ListItemText primary="Show %" />
                                <Switch
                                    checked={percentage_show}
                                    onChange={handleChange}
                                    color="default"
                                    name="percentage"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            </MenuItem>
                            <Divider hidden={!barChartView} />
                            <MenuItem key="TableChart" onClick={handleChartView}>
                                <ListItemText primary={barChartView ? "Table View" : "Graph View"} />
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleSummary}>
                                <ListItemText primary={summaryShow ? "Single Chart" : "Summary Charts"} />
                            </MenuItem>
                        </List>

                    </Menu>
                </div>
            </div>

            <div className="barChartWrapper" style={{ width: '100%' }}>

                {
                    barChartView && !summaryShow && !pageLoading && <CustomBarChart
                        height={370}
                        format={{
                            format: '%', position: 'right',
                            slice: 1, singleBar: true
                        }}
                        colors={colorBarStack}
                        data={chartData[props.viewMode] ? chartData[props.viewMode] : []}
                    />
                }

                {
                    !barChartView && !summaryShow && !pageLoading && <Table
                        headers={tableData.header[props.viewMode]}
                        spacing={tableData.spacing[props.viewMode]}
                        data={tableData.data[props.viewMode]}
                    />
                }

                {
                    summaryShow && !pageLoading && <SummaryCharts data={chartData[props.viewMode]} colorBarStack={colorBarStack} />
                }

                {
                    pageLoading && <div className="panel-body terminology d-flex justify-content-center align-items-center">
                        <img className="pb-5 mb-5" src={loadingGif} alt="loader gif" />
                    </div>
                }

            </div>
        </div>
    );
};

export default ProductEngagement;
