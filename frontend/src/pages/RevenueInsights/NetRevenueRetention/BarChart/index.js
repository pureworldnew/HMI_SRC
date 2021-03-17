import React, { useState, useRef } from "react";
import {
    Menu, MenuItem, IconButton, List, ListItem,
    ListItemText, Divider, Switch
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Select from 'react-select';

import { CustomBarChart, CustomBarChartLegend } from '../../../../components/BarChart';
import { ExportToJPG } from '../../../../components/ContextMenu';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DatePickerPopover from "../../../../components/DatePickerPopover";


const options = [
  { value: "2018", label: "2017-2018" },
  { value: "2019", label: "2018-2019" },
  { value: "2020", label: "2019-2020" }
];

const formatter = (value) => `${value}%`;

const BC = () => {
    let containerRef = useRef();
    let colorBarStack = ['#333', '#626060', '#777', '#8c8686', '#a79d9d'];

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

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [switchStates, setShowCtrl] = useState({
        showTotals: false,
        showSegments: false
    });
    const handleChange = (event, checked) => {
        setShowCtrl({
            ...switchStates,
            [event.target.id]: checked
        });
    };

  const data = [
      {
          month: "Jan",
          Amount: 40
      },
      {
          month: "Feb",
          Amount: 50
      },
      {
          month: "Mar",
          Amount: 20
      },
      {
          month: "Apr",
          Amount: 60
      },
      {
          month: "May",
          Amount: 100
      },
      {
          month: "Jun",
          Amount: 80
      },
      {
          month: "Jul",
          Amount: 150
      },
      {
          month: "Aug",
          Amount: 30
      },
      {
          month: "Sep",
          Amount: 31
      },
      {
          month: "Oct",
          Amount: 110
      },
      {
          month: "Nov",
          Amount: 22
      },
      {
          month: "Dec",
          Amount: 40
      }
  ];


  return (
      <div className="barChartContainer" ref={containerRef} style={{ alignItems: 'flex-start' }}>
          <div className="barChart__header">
              <h3>Net Revenue Retention</h3>
              <div style={{display: 'flex', alignItems: 'center'}}>
                  <CustomBarChartLegend colors={colorBarStack} data={data}>
                      <DatePickerPopover
                        value={(data) => console.log(data)}
                      />
                  </CustomBarChartLegend>

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

                  <List component="nav" className="context-menu" aria-label="secondary mailbox folders">
                      <MenuItem onClick={handleClose}>
                        <ListItemText primary="Export To" />
                      </MenuItem>
                      <ExportToJPG elementToConvert={containerRef} imageName="Net Revenue Retention" handleClose={handleClose} />
                      <MenuItem onClick={handleClose}>
                        <ListItemText primary="Excel XLSX" />
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ListItemText primary="Google Sheet" />
                      </MenuItem>
                      <Divider />
                      <MenuItem style={{display: "block"}}>
                          <ListItemText primary="Show Totals on Chart" />
                          <Switch
                          id="showTotals"
                          checked={switchStates.showTotals}
                          onChange={handleChange}
                          color="default"
                          name="show-totals"
                          />
                      </MenuItem>
                      <Divider />
                      <MenuItem style={{display: "block"}}>
                          <ListItemText primary="Show/Hide Segments" />
                          <Switch
                          id="showSegments"
                          checked={switchStates.showSegments}
                          onChange={handleChange}
                          color="default"
                          name="show-segments"
                          />
                      </MenuItem>
                  </List>

              </Menu>
              </div>
          <div className="barChartWrapper" style={{ width: '100%' }}>
            <CustomBarChart height={370} colors={colorBarStack} data={data}
                            format={{format: '%', position: 'right', slice: 1, singleBar: true}} />
          </div>
      </div>
  );
};

export default BC;
