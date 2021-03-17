import React, { useState } from 'react';
import Table from './table';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DatePickerPopover from '../DatePickerPopover';
import ButtonDotsMore from "../ButtonDotsMore";

const options = [
  { value: '2018', label: '2018' },
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' }
];

const TableView = (props) => {
  const {
    tableTitle,
    tableClassName,
    tableHeaders,
    tableSpacing,
    tableData,
    handleChangeView,
    toolbarType,
    handleSearch
  } = props;
  const currentYear = new Date().getFullYear();
  const [anchorEl, setAnchorEl] = useState(null);
  const [datePopover, setDatePopover] = useState(null);
  const [filterDate, setFilterDate] = useState({
    type: 'custom',
    date: [currentYear, currentYear - 1]
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onShowDate = (type, value) => {
    const date = type === 'custom' ? value : [value];
    setFilterDate({ type: type, date: date });
    setDatePopover(null);
  };
  return (
    <div className="barChartContainer" style={{ alignItems: 'flex-start' }}>
      <div className="barChart__header" style={{ marginBottom: '22px' }}>
        <h3>{tableTitle}</h3>
        <div className="barChart__legend">
          {toolbarType === 'search' ? (
            <div>
              <label className="input-search-label">
                <input
                  className="input-search"
                  type="text"
                  name="search"
                  placeholder="Search"
                  //value={searchText || ''}
                  onChange={handleSearch}
                />
              </label>
            </div>
          ) : (
            <>
              <IconButton
                onClick={(e) => setDatePopover(e.currentTarget)}
                aria-label="right"
                size="large"
                style={{
                  border: '1px solid #E4E4E4',
                  borderRadius: '4px',
                  height: '28px',
                  padding: '3px 12px',
                  color: '#000000'
                }}>
                {filterDate.type === 'custom'
                  ? `${filterDate.date[0]} - ${filterDate.date[1]} `
                  : filterDate.date[0]}
                <ExpandMoreIcon
                  style={{
                    marginLeft: '12px',
                    color: '#868E9A'
                  }}
                />
              </IconButton>
            </>
          )}

          <DatePickerPopover
            onShow={onShowDate}
            popoverId={datePopover}
            handleClose={() => setDatePopover(null)}
          />
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
                handleChangeView('chartMultiple');
                handleClose();
              }}>
              <ListItem>
                <ListItemText primary="Multiple Charts" />
              </ListItem>
            </MenuItem>
          </List>
        </Menu>
      </div>
      <div className="barChartWrapper" style={{ width: '100%' }}>
        <Table
          headers={tableHeaders || []}
          spacing={tableSpacing || []}
          data={tableData || []}
          tableClassName={tableClassName}
        />
      </div>
    </div>
  );
};

export default TableView;
