import React, { useState } from 'react';
import { CustomBarChart, CustomBarChartLegend } from '../BarChart/index.js';
import {
  Menu,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider
  // Switch
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Chart from './Chart';
import ButtonDotsMore from "../ButtonDotsMore";

const ComposedChart = (props) => {
  let colorBarStack = ['#5F5F5F', '#5F5F5F', '#393939', '#393939', '#393939'];
  let colorBarLegend = ['#1C5DE1', '#3CD278', '#EB367E'];

  const [anchorEl, setAnchorEl] = useState(null);
  const { chartTitle, handleChangeView, labelLegend } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const data = [
    {
      period: 'Q1 2017',
      recurring_revenue: 170,
      churn: 121,
      churn_arr: 50
    },
    {
      period: 'Q2 2017',
      recurring_revenue: 32,
      churn: 213,
      churn_arr: 33
    },
    {
      period: 'Q3 2017',
      recurring_revenue: 70,
      churn: 121,
      churn_arr: 41
    },
    {
      period: 'Q4 2017',
      recurring_revenue: 181,
      churn: 21,
      churn_arr: 75
    },
    {
      period: 'Q1 2018',
      recurring_revenue: 170,
      churn: 121,
      churn_arr: 50
    },
    {
      period: 'Q2 2018',
      recurring_revenue: 32,
      churn: 213,
      churn_arr: 33
    },
    {
      period: 'Q3 2018',
      recurring_revenue: 70,
      churn: 121,
      churn_arr: 41
    },
    {
      period: 'Q4 2018',
      recurring_revenue: 181,
      churn: 21,
      churn_arr: 75
    },
    {
      period: 'Q1 2019',
      recurring_revenue: 170,
      churn: 121,
      churn_arr: 50
    },
    {
      period: 'Q2 2019',
      recurring_revenue: 32,
      churn: 213,
      churn_arr: 33
    },
    {
      period: 'Q3 2019',
      recurring_revenue: 70,
      churn: 121,
      churn_arr: 41
    },
    {
      period: 'Q4 2019',
      recurring_revenue: 175,
      churn: 21,
      churn_arr: 75
    },
  ];

  // TODO: : need to deal with null values
  return (
    <div className="barChartContainer" style={{ alignItems: 'flex-start' }}>
      <div className="barChart__header">
        <h3>{chartTitle}</h3>
        <div className="barChart__legend">
          <div style={{ display: 'flex' }}>
            {labelLegend.map((key, index) => (
              <div className="barChart__legend-item">
                <div
                  className="barChart__legend-mark"
                  style={{ backgroundColor: colorBarLegend[index] }}
                />
                <p className="barChart__legend-text">{key}</p>
              </div>
            ))}
            <ButtonDotsMore onClick={(e) => setAnchorEl(e.currentTarget)} />
          </div>

          <Menu
            id="chart-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <List component="nav" aria-label="secondary mailbox folders">
              <MenuItem onClick={handleClose}>
                <ListItem>
                  <ListItemText primary="Export To" />
                </ListItem>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItem>
                  <ListItemText primary="Excel XLSX" />
                </ListItem>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItem>
                  <ListItemText primary="Google Sheet" />
                </ListItem>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItem>
                  <ListItemText primary="Google Sheets" />
                </ListItem>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleChangeView('chartSingle');
                  handleClose();
                }}>
                <ListItem>
                  <ListItemText primary="Graph View" />
                </ListItem>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleChangeView('table');
                  handleClose();
                }}>
                <ListItem>
                  <ListItemText primary="Table View" />
                </ListItem>
              </MenuItem>
            </List>
          </Menu>
        </div>
      </div>
      <div className="barChartWrapper" style={{ width: '100%' }}>
        <Chart data={data} />
        {/*<CustomBarChart*/}
        {/*  height={445}*/}
        {/*  colors={colorBarStack}*/}
        {/*  data={data}*/}
        {/*  format={{ format: '$', position: 'left' }}*/}
        {/*  stacked={true}*/}
        {/*  tooltip={true}*/}
        {/*  dateType="date"*/}
        {/*/>*/}
      </div>
    </div>
  );
};

export default ComposedChart;
