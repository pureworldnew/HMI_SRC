import React, { useState } from "react";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {
    AM_period_chart, AM_account_chart, AM_account_manager_chart,
    AM_account_period_chart, AM_account_manager_period_chart
} from "../../../../../utils/Utils";

import Switch from '@material-ui/core/Switch';
import { CustomBarChart, CustomBarChartLegend } from '../../../../../components/BarChart';





const BC = (props) => {
    // colors for chart bars, this con be randomized to get the colors for the bars
    let colorBarStack = ['#333', '#626060', '#777', '#8c8686', '#a79d9d'];
    let [anchorEl, setAnchorEl] = useState(null);
    let [percentage_show, setpercentage_show] = useState();
    let mockData = {
      period: AM_period_chart,
      account: AM_account_chart,
      account_manager: AM_account_manager_chart,
      account_by_period: AM_account_period_chart,
      account_manager_by_period: AM_account_manager_period_chart
    };
    // functions to handle with icon button that ttrigger menu list in chart legend
    let legendCtrl = {
        handleClick: (event) => {
            setAnchorEl(event.currentTarget);
        }
    };


    const handleChange = event => {
        setpercentage_show(event.target.checked);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleTableView = () => {
        handleClose();
        props.handleTableView();
    }


    return (
        <div className="barChartContainer" style={{ alignItems: 'flex-start' }}>
            <div className="barChart__header">
                <h3 style={{ fontSize: "1.8rem", margin: 10, marginBottom: 30 }}>Managed Revenue</h3>

                <CustomBarChartLegend colors={colorBarStack} controllers={legendCtrl} data={mockData[props.viewMode] ? mockData[props.viewMode] : []} />

                <Menu id="chart-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >

                    <List component="nav" aria-label="secondary mailbox folders">
                        <MenuItem onClick={handleClose} key={props.viewMode+'-1'}>
                            <ListItem >
                                <ListItemText primary="Export To" />
                            </ListItem>
                        </MenuItem>
                        <MenuItem onClick={handleClose} key={props.viewMode+'-2'}>
                            <ListItem>
                                <ListItemText primary="JPG" />
                            </ListItem>
                        </MenuItem>
                        <MenuItem onClick={handleClose} key={props.viewMode+'-3'}>
                            <ListItem>
                                <ListItemText primary="XLSX" />
                            </ListItem>
                        </MenuItem>
                        <MenuItem onClick={handleClose} key={props.viewMode+'-4'}>
                            <ListItem>
                                <ListItemText primary="Google Sheets" />
                            </ListItem>
                        </MenuItem>
                        <Divider />

                        <MenuItem key={props.viewMode+'-5'}>
                            <ListItem>
                                <ListItemText primary="Show %" />
                            </ListItem>
                        </MenuItem>
                        <MenuItem>
                            <Switch
                                checked={percentage_show}
                                onChange={handleChange}
                                color="default"
                                name="percentage"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </MenuItem>
                        <MenuItem onClick={handleTableView} key={props.viewMode+'-6'}>
                            <ListItem>
                                <ListItemText primary="Table View" />
                            </ListItem>
                        </MenuItem>
                        <MenuItem onClick={handleClose} key={props.viewMode+'-7'}>
                            <ListItem>
                                <ListItemText primary="Multiple Charts" />
                            </ListItem>
                        </MenuItem>
                    </List>
                </Menu>

            </div>
            <div className="barChartWrapper" style={{ width: '100%' }}>

                <CustomBarChart height={445} format={{format: '$', position: 'left'}} colors={colorBarStack} data={mockData[props.viewMode] ? mockData[props.viewMode] : []} />

            </div>
        </div>
    );
};

export default BC;
