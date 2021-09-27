import React from 'react';
import { connect } from 'react-redux';
import UserCreateModal from '../../Admin/Modal/UsersModal/Create/';
import signalImg from '../../../assets/img/signal.png';
import { withRouter } from 'react-router-dom';

import './header.scss';

const Header = (props) => {
  const { title, subTitle, history, type } = props;

  const createNewNotification = () => {
    history.push('/notifications-create');
  };

  if (type === undefined) {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
          <p className="welcomeMessage__name">{subTitle}</p>
        </div>
      </div>
    );
  } else if (title === 'Admin') {
    if (type === 'AdminUsers') {
      return (
        <div className="dashboard__header">
          <div className="dashboard__welcomeMessage welcomeMessage">
            <h3 className="welcomeMessage__title">{title}</h3>
          </div>
          <div className="revenue__buttons">
            <UserCreateModal
              buttonLabel="+ Add New User"
              className="TeamsCreateModalCustomCss"
            />
          </div>
        </div>
      );
    } else if (type === 'AdminSettings') {
      return (
        <div className="dashboard__header">
          <div className="dashboard__welcomeMessage welcomeMessage">
            <h3 className="welcomeMessage__title">{title}</h3>
          </div>
        </div>
      );
    } else if (
      type === 'AdminConnections' &&
      localStorage.getItem('roleId') < 3
    ) {
      return (
        <div className="dashboard__header">
          <div className="dashboard__welcomeMessage welcomeMessage">
            <h3 className="welcomeMessage__title">{title}</h3>
          </div>
        </div>
      );
    } else {
      return (
        <div className="dashboard__header">
          <div className="dashboard__welcomeMessage welcomeMessage">
            <h3 className="welcomeMessage__title">{title}</h3>
          </div>
        </div>
      );
    }
  } else if (type === 'Sensors') {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage d-flex justify-content-center align-items-center">
          <img src={signalImg} alt="signal " className="signal mr-3" />
          <h3 className="welcomeMessage__title">{title}</h3>
        </div>
      </div>
    );
  } else if (type === 'Notifications') {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
        </div>
      </div>
    );
  } else if (type === 'Notification_lists') {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
        </div>
        <div
          className="dashboard__buttons"
          style={{ maxWidth: '280px', justifyContent: 'flex-end' }}>
          <button
            className="button button--block-admin button-primary"
            onClick={() => {
              createNewNotification(true);
            }}>
            + Create New Notification
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
        </div>
      </div>
    );
  }
};
const mapStateToProps = ({
  dashboard_header: {
    set_connection_company,
    set_revenue_contract_company,
    set_revenue_waterfall_company,
    set_insight_arr_segment
  }
}) => ({
  set_connection_company,
  set_revenue_contract_company,
  set_revenue_waterfall_company,
  set_insight_arr_segment
});

const mapDispatchToProps = ({
  dashboard_header: {
    updateConnectionState,
    updateContractState,
    updateWaterfallState,
    updateInsightArrSegmentState
  }
}) => ({
  updateConnectionState: (value) => updateConnectionState(value),
  updateContractState: (value) => updateContractState(value),
  updateWaterfallState: (value) => updateWaterfallState(value),
  updateInsightArrSegmentState: (value) => updateInsightArrSegmentState(value)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
