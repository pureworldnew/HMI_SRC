import React, { useState, useEffect, useRef } from 'react';
import {
  CustomBarChart,
  CustomBarChartLegend
} from '../../../../components/BarChart';
import {
  Menu,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Switch
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import RevenueService from '../../../../services/RevenueService';
import { ExportToJPG } from '../../../../components/ContextMenu';
import DatePickerPopover from "../../../../components/DatePickerPopover";

const BC = (props) => {
  let containerRef = useRef();
  let colorBarStack = ['#333', '#626060', '#777', '#8c8686', '#a79d9d'];
  const [anchorEl, setAnchorEl] = useState(null);
  const [ExpiringChart, setExpiringChart] = useState([]);

  const data = [
    {
      month: 'January',
      Amount: 3230
    },
    {
      month: 'February',
      Amount: 5340
    },
    {
      month: 'March',
      Amount: 2333
    },
    {
      month: 'April',
      Amount: 2460
    },
    {
      month: 'May',
      Amount: 100
    },
    {
      month: 'June',
      Amount: 80
    },
    {
      month: 'July',
      Amount: 150
    },
    {
      month: 'August',
      Amount: 30
    },
    {
      month: 'September',
      Amount: 31
    },
    {
      month: 'October ',
      Amount: 110
    },
    {
      month: 'November',
      Amount: 22
    },
    {
      month: 'December',
      Amount: 40
    }
  ];

  useEffect(() => {
    RevenueService.getExpiringChart(null) // please replace with company name
      .then((res) => {
        setExpiringChart(res.data);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);

  // console.log('getExpiringChart: ', ExpiringChart);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTableView = () => {
    handleClose();
    props.handleTableView();
  };

  return (
    <div
      className="barChartContainer"
      ref={containerRef}
      style={{ alignItems: 'flex-start' }}>
      <div className="barChart__header">
        <h3>Expiring Contracts (2019)</h3>
        <div className="barChart__legend">
          <div style={{ display: 'flex' }}>
            <CustomBarChartLegend colors={colorBarStack} data={ExpiringChart} />

            <DatePickerPopover
              value={(data) => console.log(data)}
            />
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
                imageName="Expiring Contracts"
                handleClose={handleClose}
              />
              <MenuItem onClick={handleClose}>
                <ListItemText primary="PNG" />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemText primary="XLSX" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleTableView}>
                <ListItemText primary="Table View" />
              </MenuItem>
            </List>
          </Menu>
        </div>
      </div>
      <div className="barChartWrapper" style={{ width: '100%' }}>
        <CustomBarChart
          height={370}
          colors={colorBarStack}
          data={ExpiringChart}
          format={{
            position: 'left',
            slice: 1,
            singleBar: true
          }}
        />
      </div>
    </div>
  );
};

export default BC;
