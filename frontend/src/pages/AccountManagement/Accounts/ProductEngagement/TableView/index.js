import React, { useState } from "react";
import Table from '../../../../RevenueManagement/Overview/Table';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { AM_period_dataTable, 
  AM_period_dataTable_header, 
  AM_period_dataTableSpacing, 
  AM_account_dataTable, 
  AM_account_dataTable_header,
  AM_account_dataTableSpacing,
  AM_account_manager_dataTable,
  AM_account_manager_dataTable_header,
  AM_account_manager_dataTableSpacing }
 from "../../../../../utils/Utils";

const TableView = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChartView = () => {
    handleClose();
    props.handleChartView();
  }

  return (
    <div className="barChartContainer" style={{ alignItems: 'flex-start' }}>
      <div className="barChart__header">
        <h3 style={{ fontSize: "1.8rem", margin: 10, marginBottom: 30 }}>Product Engagement</h3>
        <div className="barChart__legend" >
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </IconButton>
        </div>
        <Menu
          id="chart-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >

          <List component="nav" aria-label="secondary mailbox folders">
            <MenuItem onClick={handleClose}>
              <ListItem >
                <ListItemText primary="Export To" />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <ListItemText primary="JPG" />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>

              <ListItem>
                <ListItemText primary="XLSX" />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>

              <ListItem>
                <ListItemText primary="Google Sheets" />
              </ListItem>
            </MenuItem>
            <Divider />

            <MenuItem onClick={handleChartView}>
              <ListItem>
                <ListItemText primary="Graph View" />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>

              <ListItem>
                <ListItemText primary="Multiple Charts" />
              </ListItem></MenuItem>
          </List>

        </Menu>

      </div>

      <div className="barChartWrapper" style={{ width: '100%' }}>

      <Table
          headers={props.viewMode === 'account' ? AM_account_dataTable_header : props.viewMode === 'account_manager' ? AM_account_manager_dataTable_header : AM_period_dataTable_header}
          spacing={props.viewMode === 'account' ? AM_account_dataTableSpacing : props.viewMode === 'account_manager' ? AM_account_manager_dataTableSpacing : AM_period_dataTableSpacing}
          data={props.viewMode === 'account' ? AM_account_dataTable : props.viewMode === 'account_manager' ? AM_account_manager_dataTable : AM_period_dataTable}
        />
      </div>

    </div>


  );
};

export default TableView;
