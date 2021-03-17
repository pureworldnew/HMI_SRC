import React, { useState, useRef } from 'react';
import themeVars from '../../../styles/_normalization.scss';

import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { ExportToJPG } from '../../../components/ContextMenu';

const formatter = (value) => `$${Math.round(value / 1000)}K`;

const CustomizedLabel = (props) => {
  const { x, y, value, format, height } = props;
  const stringHeight = 25;
  const yOnTop = height < stringHeight;
  const label = `$${Math.round(value / 1000)}K`;
  return (
    <g>
      <text
        className="barChartLabel"
        x={x + props.viewBox.width / 2}
        y={yOnTop ? y - 7 : y + props.viewBox.height / 2 + 7}
        dy={-4}
        fill={yOnTop ? themeVars.headings : 'white'}
        textAnchor="middle">
        {label}
      </text>
    </g>
  );
};

const BC = () => {
  const containerRef = useRef();
  const data = [
    {
      month: 'Jan',
      Amount: 40000
    },
    {
      month: 'Feb',
      Amount: 50000
    },
    {
      month: 'Mar',
      Amount: 20000
    },
    {
      month: 'Apr',
      Amount: 60000
    },
    {
      month: 'May',
      Amount: 100000
    },
    {
      month: 'Jun',
      Amount: 80000
    },
    {
      month: 'Jul',
      Amount: 75000
    },
    {
      month: 'Aug',
      Amount: 30000
    },
    {
      month: 'Sep',
      Amount: 31000
    },
    {
      month: 'Oct',
      Amount: 110000
    },
    {
      month: 'Nov',
      Amount: 22000
    },
    {
      month: 'Dec',
      Amount: 400
    }
  ];

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleTableView = () => {
  //   handleClose();
  //   props.handleTableView();
  // }

  return (
    <div
      className="barChartContainer"
      ref={containerRef}
      style={{ alignItems: 'flex-start', height: '324px' }}>
      <div className="barChart__header">
        <h3>ARR By Quarter Actuals (2019)</h3>
        <div className="barChart__legend">
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
          <List
            component="nav"
            className="context-menu"
            aria-label="secondary mailbox folders">
            <MenuItem onClick={handleClose}>
              <ListItemText primary="Export To" />
            </MenuItem>
            <ExportToJPG
              elementToConvert={containerRef}
              imageName="ARR By Quarter"
              handleClose={handleClose}
            />
            <MenuItem onClick={handleClose}>
              <ListItemText primary="Excel XLSX" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemText primary="Google Sheet" />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemText primary="Table View" />
            </MenuItem>
          </List>
        </Menu>
      </div>
      <div className="barChartWrapper" style={{ width: '100%' }}>
        <ResponsiveContainer height={240}>
          <BarChart
            data={data}
            margin={{
              top: 50,
              right: 0,
              left: -15,
              bottom: 5
            }}
            barAmountGap={20}
            barSize={70}>
            <XAxis
              dataKey="month"
              scale="point"
              fontFamily="Open Sans"
              fontWeight="600"
              fontSize="12px"
              lineHeight="16px"
              letterSpacing="0.01em"
              tick={{ fill: themeVars.headings }}
              tickSize
              dy={12}
              padding={{ left: 50, right: 50 }}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={themeVars.elements2}
            />
            <YAxis
              fontWeight="normal"
              fontSize="14px"
              lineHeight="20px"
              tick={{ fill: themeVars.headings }}
              axisLine={false}
              tickSize="0"
              dx={-5}
              tickFormatter={formatter}
              padding={{ left: 30 }}
            />
            <Tooltip />
            <Bar
              dataKey="Amount"
              fill="#1C5DE1"
              radius={[8, 8, 0, 0]}
              label={<CustomizedLabel />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BC;
