import React, {useState, useRef } from "react";
import {
    Menu, MenuItem, List, ListItem,
    ListItemText, Divider, IconButton
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Switch from '@material-ui/core/Switch';


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
import { ExportToJPG } from '../../../../components/ContextMenu';



const ManagedRevenue = (props) => {
    let colorBarStack = ['#333', '#626060', '#777', '#8c8686', '#a79d9d'];
    let mockData = {
      period: AM_account_chart,
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
    const [percentage_show, setpercentage_show] = useState(false);
    const containerRef = useRef();

    const handleClose = (event) => {
        setAnchorEl(null);
    };

    const handleChange = (event, checked) => {
        setpercentage_show(checked);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleChartView = ()=>{
        setBarChartView(!barChartView);
        setTimeout(() => {
            handleClose();
        }, 500);
    };



    return  (
        <div className="barChartContainer" ref={containerRef} style={{ alignItems: 'flex-start' }}>
            <div className="barChart__header">
                <h3 style={{ fontSize: "1.8rem" }}>Managed Revenue</h3>
                <div className="barChart__legend" >
                    <div style={{display: 'flex'}}>
                        {barChartView && <CustomBarChartLegend key="chart-legend" showPercentage={percentage_show} colors={colorBarStack} data={mockData[props.viewMode] ? mockData[props.viewMode] : []} />}

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
                            <ExportToJPG elementToConvert={containerRef} imageName="Managed Revenue" handleClose={handleClose} />
                            <MenuItem onClick={handleClose}>
                                <ListItemText primary="XLSX" />
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemText primary="Google Sheet" />
                            </MenuItem>
                            <Divider hidden={!barChartView} />
                            <MenuItem style={{display: "block"}} hidden={!barChartView}>
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
                        </List>

                    </Menu>
                </div>
            </div>

            <div className="barChartWrapper" style={{ width: '100%' }}>

                {
                    barChartView && <CustomBarChart
                        height={370}
                        format={{format: '$', position: 'left',
                            slice: 1, singleBar: true}}
                        colors={colorBarStack}
                        data={mockData[props.viewMode] ? mockData[props.viewMode] : []}
                     />
                }

                {
                    !barChartView && <Table
                      headers={tableMockData.header[props.viewMode]}
                      spacing={tableMockData.spacing[props.viewMode]}
                      data={tableMockData.data[props.viewMode]}
                    />
                }

            </div>
        </div>
    );
};

export default ManagedRevenue;
