import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { TrendingUp, TrendingDown } from 'react-feather';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TeamsEditModal from '../../pages/Admin/Modal/CompaniesTeamsModal/EditModal/index';
import TeamViewModal from '../../pages/Admin/Modal/CompaniesTeamsModal/ViewModal/index';
import UnAvailableToolTip from '../../pages/Components/TooltipComponents/UnAvailableTooltipComponent';
// import PopoverItem from '../../pages/Components/PopOverComponent/Admin/popovercomponent';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

import Battery20Icon from '@material-ui/icons/Battery20';
import BatteryFullIcon from '@material-ui/icons/BatteryFull';
import Battery50Icon from '@material-ui/icons/Battery50';
import BtnDots from '../ButtonDotsMore';
import CompanyService from '../../services/CompanyService';
import thermometer from '../../assets/svg/heat.svg';
import sensorLive from '../../assets/img/sensor.png';
import highSignal from '../../assets/img/high-signal.png';

// import PopoverItem from '../../Components/PopOverComponent/Admin/popovercomponent';

// import * as Actions from "../../../store/actions/index"
// import { Popover } from '@material-ui/core';
// import Grid from '@material-ui/core/Grid';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import './startcard.scss';

const StatCard = (props) => {
  const [members, setMembers] = useState('');

  let { dotsMore, main, bottom, title, companyId, set_create_company } = props;

  let adminTeamsCardCircles = members > 9 ? 9 : members;
  let adminBottome = members > 9 ? members - 9 : null;

  let page = props.page;
  let bottom_dollar = props.bottom_dollar;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const dispatch = useDispatch();

  useEffect(() => {
    CompanyService.getCompanyUsers(companyId)
      .then((res) => {
        props.updateState(false);
        setMembers(res.data.data.users.length);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, [set_create_company]);

  // const handleChange = event => {
  //   console.log(event);
  //   setpercentage_show(event.target.checked);
  // };

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

  if (page === 'revenue-management') {
    return (
      <div className="statcard" style={{ gridArea: `card-${props.grid}` }}>
        <p
          className="statcard__title"
          style={{ display: 'flex', justifyContent: 'space-between' }}>
          {props.title}
          {dotsMore && (
            <BtnDots
              onClick={() => {}}
              popoverId={dotsMore}
              style={{ padding: 0 }}
            />
          )}
        </p>
        <p className="statcard__main">{main}</p>
        <div className="statcard__bottom">
          <p>{bottom}</p>
        </div>
      </div>
    );
  } else if (page === 'accounts') {
    return (
      <div className="statcard" style={{ gridArea: `card-${props.grid}` }}>
        <p className="statcard__title">{props.title}</p>
        <p className="statcard__main">{main}</p>
        <div className="statcard__bottom">
          <p>Yesterday: {bottom}</p>
          {hasIncreased ? (
            <TrendingUp style={{ marginLeft: '1rem' }} />
          ) : (
            <TrendingDown style={{ marginLeft: '1rem' }} />
          )}
        </div>
      </div>
    );
  } else if (page === 'revenue-churn') {
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
  } else if (page === 'task-list') {
    return (
      <div className="statcard" style={{ gridArea: `card-${props.grid}` }}>
        <p className="statcard__title">{props.title}</p>
        <p className="statcard__main">{main}</p>
        <div className="statcard__bottom">
          <p>Yesterday: {bottom}</p>
          <i
            className={
              hasIncreased ? 'ft-arrow-up-right' : 'ft-arrow-down-left'
            }></i>
        </div>
      </div>
    );
  } else if (page === 'adminTeamsCard') {
    return (
      <div className="statcard" style={{ gridArea: `card-${props.grid}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p className="statcard__title adminTeamsCardTitle">{props.title}</p>
          <div className="adminTeamsCardMore">
            {getAccountByPeriodLegend(handleClick)}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          {circleElements(adminTeamsCardCircles)}
        </div>
        <div className="statcard__bottom adminTeamsCardBottome">
          {!!adminBottome && <p>& {adminBottome} more.</p>}
        </div>
        <Menu
          id="chart-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <List component="nav" aria-label="secondary mailbox folders">
            <MenuItem>
              <ListItem onClick={handleClose}>
                <TeamViewModal buttonLabel="View" type="team" />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <TeamsEditModal
                  buttonLabel="Edit"
                  className="TeamsEditModalCustomCss"
                  type="team"
                />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <p
                  style={{
                    width: '35px',
                    height: '20px',
                    fontFamily: 'Open Sans',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    lineHeight: '20px',
                    alignItems: 'center',
                    letterSpacing: '0.01em',
                    color: '#000000'
                  }}>
                  Delete
                </p>
              </ListItem>
            </MenuItem>
          </List>
        </Menu>
      </div>
    );
  } else if (page === 'companies') {
    return (
      <div className="statcard" style={{ gridArea: `card-${props.grid}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p className="statcard__title adminTeamsCardTitle">{props.title}</p>
          <div className="adminTeamsCardMore">
            {getAccountByPeriodLegend(handleClick)}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          {circleElements(adminTeamsCardCircles)}
        </div>
        <div className="statcard__bottom adminTeamsCardBottome">
          {!!adminBottome && <p>& {adminBottome} more.</p>}
        </div>
        <Menu
          className="popOver"
          id="chart-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <List component="nav" aria-label="secondary mailbox folders">
            <MenuItem>
              <ListItem onClick={handleClose}>
                <TeamViewModal
                  buttonLabel="View"
                  type="companies"
                  title={title}
                  companyId={companyId}
                />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <TeamsEditModal
                  buttonLabel="Edit"
                  className="TeamsEditModalCustomCss"
                  type="companies"
                />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <p
                  style={{
                    width: '65px',
                    height: '25px',
                    paddingTop: '7px',
                    textAlign: 'center',
                    fontFamily: 'Open Sans',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    lineHeight: '20px',
                    alignItems: 'center',
                    letterSpacing: '0.01em',
                    color: '#000000'
                  }}>
                  Un-Pause
                </p>
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <p
                  style={{
                    width: '65px',
                    height: '25px',
                    paddingTop: '7px',
                    textAlign: 'center',
                    fontFamily: 'Open Sans',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    lineHeight: '20px',
                    alignItems: 'center',
                    letterSpacing: '0.01em',
                    color: '#000000'
                  }}>
                  Delete
                </p>
              </ListItem>
            </MenuItem>
          </List>
        </Menu>
      </div>
    );
  } else if (page === 'sensors') {
    return (
      <div className="statcard p-8" style={{ gridArea: `card-${props.grid}` }}>
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
            <div className="adminTeamsCardMore">
              {getAccountByPeriodLegend(handleClick)}
            </div>
          </div>
        </div>

        <Menu
          className="popOver"
          id="chart-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <List component="nav" aria-label="secondary mailbox folders">
            <MenuItem>
              <ListItem onClick={handleClose}>
                <TeamViewModal
                  buttonLabel="View"
                  type="companies"
                  title={title}
                  companyId={companyId}
                />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <TeamsEditModal
                  buttonLabel="Edit"
                  className="TeamsEditModalCustomCss"
                  type="companies"
                />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <p
                  style={{
                    width: '65px',
                    height: '25px',
                    paddingTop: '7px',
                    textAlign: 'center',
                    fontFamily: 'Open Sans',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    lineHeight: '20px',
                    alignItems: 'center',
                    letterSpacing: '0.01em',
                    color: '#000000'
                  }}>
                  Un-Pause
                </p>
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <p
                  style={{
                    width: '65px',
                    height: '25px',
                    paddingTop: '7px',
                    textAlign: 'center',
                    fontFamily: 'Open Sans',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    lineHeight: '20px',
                    alignItems: 'center',
                    letterSpacing: '0.01em',
                    color: '#000000'
                  }}>
                  Delete
                </p>
              </ListItem>
            </MenuItem>
          </List>
        </Menu>
      </div>
    );
  } else if (page === 'notifications') {
    return (
      <div className="statcard" style={{ gridArea: `card-${props.grid}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p className="statcard__title adminTeamsCardTitle">{props.title}</p>
          <div className="adminTeamsCardMore">
            {getAccountByPeriodLegend(handleClick)}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          {circleElements(adminTeamsCardCircles)}
        </div>
        <div className="statcard__bottom adminTeamsCardBottome">
          {!!adminBottome && <p>& {adminBottome} more.</p>}
        </div>
        <Menu
          className="popOver"
          id="chart-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <List component="nav" aria-label="secondary mailbox folders">
            <MenuItem>
              <ListItem onClick={handleClose}>
                <TeamViewModal
                  buttonLabel="View"
                  type="companies"
                  title={title}
                  companyId={companyId}
                />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <TeamsEditModal
                  buttonLabel="Edit"
                  className="TeamsEditModalCustomCss"
                  type="companies"
                />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <p
                  style={{
                    width: '65px',
                    height: '25px',
                    paddingTop: '7px',
                    textAlign: 'center',
                    fontFamily: 'Open Sans',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    lineHeight: '20px',
                    alignItems: 'center',
                    letterSpacing: '0.01em',
                    color: '#000000'
                  }}>
                  Un-Pause
                </p>
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <p
                  style={{
                    width: '65px',
                    height: '25px',
                    paddingTop: '7px',
                    textAlign: 'center',
                    fontFamily: 'Open Sans',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    lineHeight: '20px',
                    alignItems: 'center',
                    letterSpacing: '0.01em',
                    color: '#000000'
                  }}>
                  Delete
                </p>
              </ListItem>
            </MenuItem>
          </List>
        </Menu>
      </div>
    );
  } else if (page === 'actions') {
    return (
      <div className="statcard p-8" style={{ gridArea: `card-${props.grid}` }}>
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
            <div className="adminTeamsCardMore">
              {getAccountByPeriodLegend(handleClick)}
            </div>
          </div>
        </div>

        <Menu
          className="popOver"
          id="chart-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <List component="nav" aria-label="secondary mailbox folders">
            <MenuItem>
              <ListItem onClick={handleClose}>
                <TeamViewModal
                  buttonLabel="View"
                  type="companies"
                  title={title}
                  companyId={companyId}
                />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <TeamsEditModal
                  buttonLabel="Edit"
                  className="TeamsEditModalCustomCss"
                  type="companies"
                />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <p
                  style={{
                    width: '65px',
                    height: '25px',
                    paddingTop: '7px',
                    textAlign: 'center',
                    fontFamily: 'Open Sans',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    lineHeight: '20px',
                    alignItems: 'center',
                    letterSpacing: '0.01em',
                    color: '#000000'
                  }}>
                  Un-Pause
                </p>
              </ListItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItem>
                <p
                  style={{
                    width: '65px',
                    height: '25px',
                    paddingTop: '7px',
                    textAlign: 'center',
                    fontFamily: 'Open Sans',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    lineHeight: '20px',
                    alignItems: 'center',
                    letterSpacing: '0.01em',
                    color: '#000000'
                  }}>
                  Delete
                </p>
              </ListItem>
            </MenuItem>
          </List>
        </Menu>
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

const mapDispatchToProps = ({ company: { updateState } }) => ({
  updateState: (value) => updateState(value)
});

const mapStateToProps = ({ company: { set_create_company } }) => ({
  set_create_company
});

export default connect(mapStateToProps, mapDispatchToProps)(StatCard);
