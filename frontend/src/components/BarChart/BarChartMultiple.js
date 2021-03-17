import React, { useState } from 'react';
import { CustomBarChart, CustomBarChartLegend } from './index.js';
import {
  Menu,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  // Switch
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const BC = (props) => {
  let colorBarStack = ['#chartMultiple', '#3CD278', '#7747E3', '#3CD278', '#7747E3'];
  let colorBarLegend = ['#1C5DE1', '#3CD278', '#7747E3'];

  const [anchorEl, setAnchorEl] = useState(null);
  const { chartTitle, handleChangeView } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const data = [
    {
      month: 'Northeast',
      '2019': 170,
      '2018': 162,
      '2017': 144
    },
    {
      month: 'Balenciaga',
      '2019': 100,
      '2018': 184,
      '2017': 155
    },
    {
      month: 'Off-White',
      '2019': 130,
      '2018': 125,
      '2017': 142
    },
    {
      month: 'Apple',
      '2019': 180,
      '2018': 125,
      '2017': 129
    },
    {
      month: 'Starbucks',
      '2019': 220,
      '2018': 167,
      '2017': 171
    },
    {
      month: 'Lighter Inc',
      '2019': 60,
      '2018': 93,
      '2017': 117
    },
    {
      month: 'Refreshments',
      '2019': 143,
      '2018': 162,
      '2017': 115
    },
    {
      month: 'Catapults',
      '2019': 120,
      '2018': 104,
      '2017': 110
    },
    {
      month: 'Rockets',
      '2019': 171,
      '2018': 104,
      '2017': 112
    },
    {
      month: 'Not Secret ',
      '2019': 111,
      '2018': 124,
      '2017': 140
    },

    {
      month: 'Unic inc',
      '2019': 117,
      '2018': 158,
      '2017': 150
    },
    {
      month: '45 RPM',
      '2019': 101,
      '2018': 184,
      '2017': 120
    }
  ];

  // TODO: : need to deal with null values
  return (
    <div className="barChartContainer" style={{ alignItems: 'flex-start' }}>
      <div className="barChart__header">
        <h3>{chartTitle}</h3>
        <div className="barChart__legend">
          <div style={{ display: 'flex' }}>
            <CustomBarChartLegend
              colors={colorBarLegend}
              data={data}
              dateType="date"
            />
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}>
              <MoreHorizIcon />
            </IconButton>
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
        <CustomBarChart
          height={445}
          colors={colorBarStack}
          data={data}
          format={{ format: '$', position: 'left' }}
          stacked={true}
          tooltip={true}
          dateType="date"
        />
      </div>
    </div>
  );
};

export default BC;
