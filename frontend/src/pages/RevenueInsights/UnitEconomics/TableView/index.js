import React, { useState } from "react";
import Table from './table';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select';

import {
  AM_period_dataTable_economics,
  AM_period_dataTable_header,
  AM_period_dataTableSpacing_economics
} from '../../../../utils/Utils';

const options = [
  { value: '2018', label: '2018' },
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' }
];

const TableView = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChartView = () => {
    handleClose();
    props.handleChartView();
  };

  const selectButtonCls = {
    option: (provided, state) => ({
      ...provided
    }),
    control: (provided, state) => ({
      ...provided,
      width: '111px',
      height: '28px',
      fontSize: '12px',
      fontWeight: '600',
      lineHeight: '16px',
      color: '#000000',
      letterSpacing: '0.01em',
      background: '#C4C4C4',
      border: '1px solid #000000',
      cursor: 'pointer',
      '&:hover': {
        border: '1px solid #000000'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      top: '50% !important'
    }),
    placeholder: (provided) => ({
      ...provided,
      top: '50%',
      color: '#000000'
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '38px',
      padding: '0 8px'
    })
  };

  return (
    <div className="barChartContainer" style={{ alignItems: 'flex-start' }}>
      <div className="barChart__header">
        <h3 style={{ fontSize: '1.8rem', margin: 10, marginBottom: 30 }}>
          Unit Economics (2019)
        </h3>
        <div className="barChart__legend">
          <Select
            classNamePrefix="select_table_option"
            options={options}
            styles={selectButtonCls}
            placeholder="2019"
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
            <MenuItem onClick={handleChartView}>
              <ListItem>
                <ListItemText primary="Graph View" />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <ListItemText primary="Multiple Charts" />
              </ListItem>
            </MenuItem>
          </List>
        </Menu>
      </div>

      <div className="barChartWrapper" style={{ width: '100%' }}>
        <Table
          headers={AM_period_dataTable_header}
          spacing={AM_period_dataTableSpacing_economics}
          data={AM_period_dataTable_economics}
        />
      </div>
    </div>
  );
};

export default TableView;
