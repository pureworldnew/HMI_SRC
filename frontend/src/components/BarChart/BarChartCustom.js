import React, { useState } from 'react';
import Select from 'react-select';
import {
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton
} from '@material-ui/core';
import { CustomBarChart, CustomBarChartLegend } from './index';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { DateRangePicker } from 'react-dates';
import Modal from '../Modal';
import DatePickerPopover from '../DatePickerPopover';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ButtonDotsMore from '../ButtonDotsMore';

const options = [
  { value: '2018', label: '2017-2018' },
  { value: '2019', label: '2018-2019' },
  { value: '2020', label: '2019-2020' }
];

const BC = (props) => {
  const currentYear = new Date().getFullYear();
  let colorBarStack = ['#333', '#626060', '#777', '#8c8686', '#a79d9d'];
  const {
    chartTitle,
    handleChangeView,
    chartData,
    popoverDatePicker,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [datePopover, setDatePopover] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [filterDate, setFilterDate] = useState({
    type: 'custom',
    date: [currentYear, currentYear - 1]
  });
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
      border: '1px solid #E4E4E4',
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
      color: '#E4E4E4'
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '38px',
      padding: '0 8px'
    })
  };
  const data = [
    {
      month: 'Jan',
      Amount: 40
    },
    {
      month: 'Feb',
      Amount: 50
    },
    {
      month: 'Mar',
      Amount: 20
    },
    {
      month: 'Apr',
      Amount: 60
    },
    {
      month: 'May',
      Amount: 100
    },
    {
      month: 'Jun',
      Amount: 80
    },
    {
      month: 'Jul',
      Amount: 150
    },
    {
      month: 'Aug',
      Amount: 30
    },
    {
      month: 'Sep',
      Amount: 31
    },
    {
      month: 'Oct',
      Amount: 110
    },
    {
      month: 'Nov',
      Amount: 22
    },
    {
      month: 'Dec',
      Amount: 40
    }
  ];
  // functions to handle with icon button that ttrigger menu list in chart legend
  let legendCtrl = {
    handleClick: (event) => {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleTableView = () => {
    handleClose();
    props.handleTableView();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="barChartContainer" style={{ alignItems: 'flex-start' }}>
      <div className="barChart__header" style={{ marginBottom: '22px' }}>
        <h3>{chartTitle}</h3>
        <div className="barChart__legend">
          {popoverDatePicker ? (
            <DatePickerPopover
              value={(data) => console.log(data)}
            />
          ) : (
            <Select
              classNamePrefix="select_table_option"
              options={options}
              styles={selectButtonCls}
              placeholder="2019"
            />
          )}
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
                handleChangeView('table');
                handleClose();
              }}>
              <ListItem>
                <ListItemText primary="Table View" />
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
        <CustomBarChart
          height={445}
          colors={colorBarStack}
          data={data}
          format={{ format: `%`, position: 'right', slice: 1, singleBar: true }}
        />
      </div>
      <Modal modalShow={modalShow} />
    </div>
  );
};

export default BC;
