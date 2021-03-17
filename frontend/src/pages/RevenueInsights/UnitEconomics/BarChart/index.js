import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select';
import {
  CustomBarChart,
  CustomBarChartLegend
} from '../../../../components/BarChart';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const options = [
  { value: '2018', label: '2017-2018' },
  { value: '2019', label: '2018-2019' },
  { value: '2020', label: '2019-2020' }
];

const BC = (props) => {
  let colorBarStack = ['#333', '#626060', '#777', '#8c8686', '#a79d9d'];
  const [anchorEl, setAnchorEl] = useState(null);
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
      letterSpacing: '0.01em',
      background: '#C4C4C4',
      border: '1px solid #000000',
      '&:hover': {
        border: '1px solid #000000'
      }
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
      <div className="barChart__header">
        <h3>Unit Economics (2019)</h3>

        <div style={{ display: 'flex' }}>
          <CustomBarChartLegend
            colors={colorBarStack}
            controllers={legendCtrl}
            data={data}>
            <Select
              options={options}
              styles={selectButtonCls}
              placeholder="2019-2020"
            />
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}>
              <MoreHorizIcon />
            </IconButton>
          </CustomBarChartLegend>
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
            <MenuItem onClick={handleTableView}>
              <ListItem>
                <ListItemText primary="Table View" />
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
        <CustomBarChart
          height={445}
          colors={colorBarStack}
          data={data}
          format={{ format: `%`, position: 'right' }}
        />
      </div>
    </div>
  );
};

export default BC;
