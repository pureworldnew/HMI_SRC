import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import UnAvailableToolTip from '../../pages/Components/TooltipComponents/UnAvailableTooltipComponent';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Checkbox from '@material-ui/core/Checkbox';

import Battery20Icon from '@material-ui/icons/Battery20';
import BatteryFullIcon from '@material-ui/icons/BatteryFull';
import Battery50Icon from '@material-ui/icons/Battery50';

import thermometer from '../../assets/svg/heat.svg';
import sensorLive from '../../assets/img/sensor.png';
import highSignal from '../../assets/img/high-signal.png';
import Popover from './Popover';
import Tooltip from '@mui/material/Tooltip';
import SignalCellularAltOutlinedIcon from '@material-ui/icons/SignalCellularAltOutlined';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import SettingsInputAntennaOutlinedIcon from '@material-ui/icons/SettingsInputAntennaOutlined';

import './startcard.scss';

const StatCard = (props) => {
  const [members, setMembers] = useState('');

  let {
    icon,
    main,
    bottom,
    medium,
    title,
    medium_1,
    medium_2,
    companyId,
    set_create_company
  } = props;

  let adminTeamsCardCircles = members > 9 ? 9 : members;
  let adminBottome = members > 9 ? members - 9 : null;

  let page = props.page;
  let bottom_dollar = props.bottom_dollar;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleCheckChange = (event) => {
    props.onSensorsChange(event.target.id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {}, [set_create_company]);

  const getAccountByPeriodLegend = (handleClick) => {
    return (
      <div className="barChart__legend">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
      </div>
    );
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const circleElements = (main) => {
    var indents = [];
    for (let i = 0; i < main; i++) {
      indents.push(
        <p
          className="statcard__main adminTeamsCardCircle"
          style={{ marginLeft: i ? '-20px' : '0px', zIndex: -i }}
          key={i}></p>
      );
    }
    return indents;
  };

  if (props.unit === 'dollar') {
    if (props.reduceToMillion === true) {
      main = `$${props.main / 1000000}M`;
    } else {
      main = `$${props.main.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }
    if (bottom_dollar) {
      bottom = `$${props.bottom
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }
  } else if (props.unit === 'percentage') {
    main = `${props.main}%`;
    bottom = `${props.bottom}%`;
  } else {
    main = `${props.main}`;
    bottom = `${props.bottom}`;
  }

  const hasIncreased = props.main > props.bottom;
  if (page === 'sensors') {
    return (
      <div
        className="statcard p-8"
        style={{
          gridArea: `card-${props.grid}`,
          boxShadow: '0px 2px 9px 3px rgb(0 0 0 / 25%)',
          borderRadius: '6px'
        }}>
        <div className="d-flex justify-content-between w-100 h-100">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start mr-5">
              <img
                src={thermometer}
                alt="temperature"
                className="temperature text-dark"
              />
              <img src={sensorLive} alt="sensor" className="sensor" />
            </div>
            <div className="d-flex flex-column justify-content-between">
              <p className="statcard__title adminTeamsCardTitle pb-5">
                {props.title}
              </p>
              <div className="pb-5 d-flex temperatureText">
                {props.temp1}, {props.temp2}
              </div>
              <div className="bg-transparent sensorRecentTime">
                {' '}
                {props.recentTime}
              </div>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-between align-items-center py-4">
            <div className="d-flex justify-content-between w-100">
              <FingerprintIcon
                className="mr-3 text-body sensor"
                style={{ fontSize: 30 }}
              />
              <img src={highSignal} alt="sensor" className="highSignal mr-3" />
              <UnAvailableToolTip title={'Battery:' + props.voltage}>
                {props.battery_status === 'red' ? (
                  <Battery20Icon className="sensor " style={{ fontSize: 30 }} />
                ) : props.battery_status === 'yellow' ? (
                  <Battery50Icon className="sensor " style={{ fontSize: 30 }} />
                ) : (
                  <BatteryFullIcon
                    className="sensor "
                    style={{ fontSize: 30 }}
                  />
                )}
              </UnAvailableToolTip>
            </div>
            <div className="adminTeamsCardMore align-self-end mr-4 mb-2">
              {getAccountByPeriodLegend(handleClick)}
            </div>
          </div>
        </div>

        <Popover
          anchorEl={anchorEl}
          handleClose={() => setAnchorEl(null)}
          onView={() => {
            // showModal('view');
            setAnchorEl(null);
          }}
          onPause={() => {
            // showModal('pause');
            setAnchorEl(null);
          }}
          onDelete={() => {
            // showModal('delete');
            setAnchorEl(null);
          }}
          onEdit={() => {
            // showModal('edit');
            setAnchorEl(null);
          }}
        />
      </div>
    );
  } else if (page === 'notification_lists') {
    return (
      <div
        className="statcard p-8"
        style={{
          gridArea: `card-${props.grid}`,
          boxShadow: '0px 2px 9px 3px rgb(0 0 0 / 25%)',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
        <div className="d-flex justify-content-between w-100 h-100">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start mr-5">
              <img
                src={thermometer}
                alt="temperature"
                className="temperature text-dark"
              />
              <img src={sensorLive} alt="sensor" className="sensor" />
            </div>
            <div className="d-flex flex-column justify-content-between">
              <p className="text-bold pb-5 adminTeamsCardTitle">
                {props.actionName}
              </p>
              <div className="pb-5 d-flex temperatureText">{props.temp1}</div>
              <div className="bg-transparent sensorRecentTime">Last Sent:</div>
            </div>
          </div>
          <div className="">
            <div className="adminTeamsCardMore">
              {getAccountByPeriodLegend(handleClick)}
            </div>
          </div>
        </div>
        <Popover
          anchorEl={anchorEl}
          handleClose={() => setAnchorEl(null)}
          onView={() => {
            // showModal('view');
            setAnchorEl(null);
          }}
          onPause={() => {
            // showModal('pause');
            setAnchorEl(null);
          }}
          onDelete={() => {
            // showModal('delete');
            setAnchorEl(null);
          }}
          onEdit={() => {
            // showModal('edit');
            setAnchorEl(null);
          }}
        />
      </div>
    );
  } else if (page === 'notifications_create') {
    return (
      <div
        className="statcard p-8"
        style={{
          gridArea: `card-${props.grid}`,
          boxShadow: '0px 2px 9px 3px rgb(0 0 0 / 25%)',
          borderRadius: '6px'
        }}>
        <div className="d-flex justify-content-between w-100 h-100">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start mr-5">
              <img
                src={thermometer}
                alt="temperature"
                className="temperature text-dark"
              />
              <img src={sensorLive} alt="sensor" className="sensor" />
            </div>
            <div className="d-flex flex-column justify-content-between">
              <p className="statcard__title adminTeamsCardTitle pb-5">
                {props.title}
              </p>
              <div className="pb-5 d-flex">
                {props.temp1}, {props.temp2}
              </div>
              <div className="bg-transparent"> {props.recentTime}</div>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-between align-items-center align-self-center py-4">
            <div className="btn">
              <Tooltip
                title={
                  <span style={{ fontSize: '18px', padding: '5px' }}>
                    Please click to enable/disable
                  </span>
                }>
                <Checkbox
                  icon={
                    <CheckCircleOutlineIcon
                      className="mr-3 text-success sensor"
                      style={{
                        fontSize: 30,
                        width: '50px',
                        height: '50px'
                      }}
                    />
                  }
                  checkedIcon={
                    <CheckCircleIcon
                      className="mr-3 text-success sensor"
                      style={{
                        fontSize: 30,
                        width: '50px',
                        height: '50px'
                      }}
                    />
                  }
                  id={props.sensorId.toString()}
                  onChange={handleCheckChange}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (page === 'dashboard') {
    return (
      <div className="statcard" style={{ gridArea: `card-${props.grid}` }}>
        <p className="statcard__title">{props.title}</p>
        <div className="statcard__content">
          <p className="statcard__main">{main}</p>
          {icon === 'SignalCellularAltOutlinedIcon' ? (
            <SignalCellularAltOutlinedIcon className="statcard__rightIcon" />
          ) : icon === 'NotificationsActiveOutlinedIcon' ? (
            <NotificationsActiveOutlinedIcon className="statcard__rightIcon" />
          ) : icon === 'SettingsInputAntennaOutlinedIcon' ? (
            <SettingsInputAntennaOutlinedIcon className="statcard__rightIcon" />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="statcard" style={{ gridArea: `card-${props.grid}` }}>
        <p className="statcard__title">{props.title}</p>
        <p className="statcard__main">{main}</p>
        <div className="statcard__bottom">
          <p>Previous Month: {bottom}</p>
          <i
            className={
              hasIncreased ? 'ft-arrow-up-right' : 'ft-arrow-down-left'
            }></i>
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = ({ sensor: { updateState } }) => ({
  updateState: (value) => updateState(value)
});

const mapStateToProps = ({ sensor: { set_create_company } }) => ({
  set_create_company
});

export default connect(mapStateToProps, mapDispatchToProps)(StatCard);
