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
import { connect } from 'react-redux';
import { ExportToJPG } from '../../../../components/ContextMenu';
import DatePickerPopover from "../../../../components/DatePickerPopover";

const BC = (props) => {
  let containerRef = useRef();
  let colorBarStack = ['#333', '#626060', '#777', '#8c8686', '#a79d9d'];
  const [anchorEl, setAnchorEl] = useState(null);
  const [ExpiringChart, setExpiringChart] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const data = [
    {
      month: 'Jan',
      SMB: 1258,
      Mid: 62,
      Enterprise: 44
    },
    {
      month: 'Feb',
      SMB: 3512,
      Mid: 84,
      Enterprise: 55
    },
    {
      month: 'Mar',
      SMB: 334,
      Mid: 125,
      Enterprise: 42
    },
    {
      month: 'Apr',
      SMB: 80,
      Mid: 125,
      Enterprise: 29
    },
    {
      month: 'May',
      SMB: 220,
      Mid: 67,
      Enterprise: 71
    },
    {
      month: 'Jun',
      SMB: 60,
      Mid: 93,
      Enterprise: 17
    },
    {
      month: 'Jul',
      SMB: 143,
      Mid: 62,
      Enterprise: 15
    },
    {
      month: 'Aug',
      SMB: 120,
      Mid: 104,
      Enterprise: 10
    },
    {
      month: 'Sep',
      SMB: 71,
      Mid: 104,
      Enterprise: 12
    },
    {
      month: 'Oct',
      SMB: 111,
      Mid: 124,
      Enterprise: 40
    },
    {
      month: 'Nov',
      SMB: 117,
      Mid: 58,
      Enterprise: 50
    },
    {
      month: 'Dec',
      SMB: 101,
      Mid: 84,
      Enterprise: 20
    }
  ];

  let contractStatusVal = '';
  contractStatusVal = localStorage.getItem('contractStatus');

  useEffect(() => {
    RevenueService.getRevenueLossExposure(props.set_revenue_contract_company)
      .then((res) => {
        // console.log('loss Exposure: ', res.data);
        // setExpiringChart(res.data);
        contractStatusVal === "ACV" ? setExpiringChart(res.data.ACV) : setExpiringChart(res.data.TCV);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);
  // TODO: : need to deal with null values
  return (
    <div
      className="barChartContainer"
      ref={containerRef}
      style={{ alignItems: 'flex-start' }}>
      <div className="barChart__header">
        <h3>Revenue Loss Exposure (2019)</h3>
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
                imageName="Revenue Loss Exposure"
                handleClose={handleClose}
              />
              <MenuItem onClick={handleClose}>
                <ListItemText primary="PNG" />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemText primary="XLSX" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
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
            format: '$', position: 'left', slice: 1,
            singleBar: true
          }}
          stacked={true}
          tooltip={true}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({
  dashboard_header: { set_connection_company, set_revenue_contract_company }
}) => ({
  set_connection_company,
  set_revenue_contract_company
});

const mapDispatchToProps = ({
  dashboard_header: { updateConnectionState, updateContractState }
}) => ({
  updateConnectionState: (value) => updateConnectionState(value),
  updateContractState: (value) => updateContractState(value)
});

export default connect(mapStateToProps, mapDispatchToProps)(BC);
