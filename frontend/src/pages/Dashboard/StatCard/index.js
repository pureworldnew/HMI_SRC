import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'react-feather';
import IconButton from '@material-ui/core/IconButton';
import { Menu, MenuItem, List, ListItem } from '@material-ui/core';
// import ListItemText from '@material-ui/core/ListItemText';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TeamsEditModal from '../../Admin/Modal/CompaniesTeamsModal/EditModal/index';
import TeamViewModal from '../../Admin/Modal/CompaniesTeamsModal/ViewModal/index';
// import PopoverItem from '../../Components/PopOverComponent/Admin/popovercomponent';
import CompanyService from '../../../services/CompanyService';
import { connect } from 'react-redux';
import SignalCellularAltOutlinedIcon from '@material-ui/icons/SignalCellularAltOutlined';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import SettingsInputAntennaOutlinedIcon from '@material-ui/icons/SettingsInputAntennaOutlined';
// import * as Actions from "../../../store/actions/index"
// import './startcard.scss';

const ActivityStatCard = (props) => {
  let { main, bottom } = props;

  return (
    <div className="statcard" style={{ gridArea: `card-${props.grid}` }}>
      <p className="statcard__title__activity">{props.title}</p>
      <div className="statcard-activity">
        <div className="statcard-activity-container">
          <p className="statcard__main">{main}%</p>
          <div className="statcard__bottom">
            <p>Increased</p>
          </div>
        </div>
        <div className="statcard-activity-container">
          <p className="statcard__main">{bottom}%</p>
          <div className="statcard__bottom">
            <p>Decreased</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = (props) => {
  const [members, setMembers] = useState('');
  const { cardId } = props;

  let main = props.main;
  let bottom = props.bottom;
  let medium = props.medium;
  let medium_1 = props.medium_1;
  let medium_2 = props.medium_2;
  let title = props.title;
  let companyId = props.companyId;
  let icon = props.icon;

  let adminTeamsCardCircles = members > 9 ? 9 : members;
  let adminBottome = members > 9 ? members - 9 : null;

  let page = props.page;
  let bottom_dollar = props.bottom_dollar;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const dispatch = useDispatch();

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
          key={i}
        />
      );
    }
    return indents;
  };

  if (props.unit === 'dollar') {
    if (props.reduceToMillion === true) {
      main = `$${(props.main / 1000000).toFixed(1)}M`;
    } else {
      main = `$${props.main.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }
    if (bottom_dollar) {
      bottom = `${props.bottom
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
        <p className="statcard__title">{props.title}</p>
        <p className="statcard__main">{main}</p>
        <div className="statcard__bottom">
          <p>{bottom}</p>
        </div>
      </div>
    );
  } else if (page === 'accounts') {
    return (
      <>
        {cardId ? (
          <ActivityStatCard {...props} />
        ) : (
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
        )}
      </>
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
            }
          />
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
            }
          />
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
        <div className="statcard__bottom">
          <p>{medium}</p>
        </div>
        <div className="statcard__bottom">
          <p>{bottom}</p>
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
  } else if (page === 'revenueGateways') {
    return (
      <div className="statcard" style={{ gridArea: `card-${props.grid}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p className="statcard__title adminTeamsCardTitle">{props.title}</p>
          <div className="adminTeamsCardMore">
            {getAccountByPeriodLegend(handleClick)}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <p>{medium_1}</p>
          <p>{medium_2}</p>
        </div>
        <div className="statcard__bottom">
          <p>{bottom}</p>
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
  } else {
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

        {/* <div className="statcard__bottom">
          <p>Previous Month: {bottom}</p>
          <i
            className={
              hasIncreased ? 'ft-arrow-up-right' : 'ft-arrow-down-left'
            }
          />
        </div> */}
      </div>
    );
  }
};

export default StatCard;
