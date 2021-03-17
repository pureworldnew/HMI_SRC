import React, { useState } from 'react';
import PieChart from '../../../components/PieChart';
import ButtonDotsMore from '../../../components/ButtonDotsMore';
import { Divider, List, ListItemText, Menu, MenuItem } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

const Overview = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const data = [
    {
      name: 'Low Usage',
      value: 2000
    },
    {
      name: 'Too Small',
      value: 4000
    },
    {
      name: 'Pricing',
      value: 2850
    },
    {
      name: 'Medium Usage',
      value: 4033
    },
    {
      name: 'High Usage',
      value: 1634
    }
  ];
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="annual-recurring-revenue">
      <div className="revenue-churn__statsGrid">
        <div className="revenue-churn__statsGrid--item">
          <div className="revenue-churn__statsGrid--item--header">
            <h1>$ Churn By Reason (2019)</h1>
            <ButtonDotsMore onClick={(e) => setAnchorEl(e.currentTarget)} />
          </div>
          <PieChart grid={1} data={data} />
        </div>
        <div className="revenue-churn__statsGrid--item">
          <div className="revenue-churn__statsGrid--item--header">
            <h1>Number of Churned Accounts by Reason (2019)</h1>
            <ButtonDotsMore onClick={(e) => setAnchorEl(e.currentTarget)} />
          </div>
          <PieChart grid={2} data={data} />
        </div>
      </div>
      <Menu
        key="chart-menu"
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
            <ListItemText primary="Export To" className="heading" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText primary="JPG" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText primary="PNG" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText primary="XLSX" />
          </MenuItem>
        </List>
      </Menu>
    </div>
  );
};

export default Overview;
