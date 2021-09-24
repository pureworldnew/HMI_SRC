import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DrawerForm from '../../Sensors/DrawerForm';
import TeamsCreateModal from '../../Admin/Modal/CompaniesTeamsModal/CreateModal/index';
import UserCreateModal from '../../Admin/Modal/UsersModal/Create/';
import CompanyService from '../../../services/CompanyService';
import signalImg from '../../../assets/img/signal.png';
import actionImg from '../../../assets/svg/action.svg';
import { withRouter } from 'react-router-dom';

import './header.scss';

const options_top = [
  { value: 'top_10', label: 'Top 10%' },
  { value: 'top_20', label: 'Top 20%' },
  { value: 'top_30', label: 'Top 30%' },
  { value: 'top_10_plus', label: 'Top 10' },
  { value: 'top_15', label: 'Top 15' },
  { value: 'top_20', label: 'Top 20' }
];

const options_views = [
  { value: 'period', label: 'Period' },
  { value: 'account', label: 'Account' },
  { value: 'account_manager', label: 'Account Manager' },
  { value: 'account_by_period', label: 'Account by Period' },
  { value: 'account_manager_by_period', label: 'Account Manager by Period' }
];

const options_monthly = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Quarterly', label: 'Quarterly' },
  { value: 'Yearly', label: 'Yearly' }
];

const timeline_select_options = [
  { value: '5', label: 'Showing: Top 5 Accounts' },
  { value: '10', label: 'Showing: Top 10 Accounts' },
  { value: '15', label: 'Showing: Top 15 Accounts' }
];
const tlCmsOptions = [];

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const customStyles = (width = 130, height = 54) => {
  return {
    container: (base) => ({
      ...base,
      display: 'inline-block',
      width: width,
      zIndex: 99
    }),
    valueContainer: (base) => ({
      ...base,
      minHeight: height
    })
  };
};

const companyOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const Header = (props) => {
  const { presentationNames, onSelectChange, createTask } = props;
  const {
    date,
    setDate,
    title,
    subTitle,
    type,
    activetab,
    sethorizontaltab,
    setTimeBase
  } = props;

  const selectButtonCls = customStyles();
  const classes = useStyles();

  const [selectCompany, setSelectCompany] = useState(null);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [revenueCompanies, setRevenueCompanies] = useState([]);
  const [revenue_company, setRevenue_Company] = useState({
    label: 'Companies: All',
    value: null
  });

  const handleClick = (event) => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  // console.log("I am here now", activetab);

  useEffect(() => {
    CompanyService.getAllCompanies()
      .then((res) => {
        // console.log('state change:', res.data);
        let companyArray = [];
        res.data.map((company) => {
          let element = {
            value: company.id,
            label: company.companyName
          };
          companyArray.push(element);
        });
        setCompanyOptions(companyArray);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
    if (activetab === 'Contracts') {
      if (props.set_revenue_contract_company === null)
        setRevenue_Company({ label: 'Companies: All', value: null });
      else
        setRevenue_Company({
          label: props.set_revenue_contract_company,
          value: props.set_revenue_contract_company
        });
    } else if (activetab === 'Contracts Waterfall') {
      if (props.set_revenue_waterfall_company === null)
        setRevenue_Company({ label: 'Companies: All', value: null });
      else
        setRevenue_Company({
          label: props.set_revenue_waterfall_company,
          value: props.set_revenue_waterfall_company
        });
    }
  }, [activetab]);

  const createNewNotification = () => {
    console.log('here is notifcation creation');
    props.history.push('/notifications-create');
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
  } else if (type === 'accounts') {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
          <p className="welcomeMessage__name">{subTitle}</p>
        </div>
        <div className="dashboard__buttons">
          <Select options={options_top} placeholder="Top: All" />
          <Select
            options={options_views}
            placeholder="Viewing by: Period"
            onChange={(val) => sethorizontaltab(val.value)}
          />
          <Select
            options={options_monthly}
            placeholder="Monthly"
            onChange={(val) => setTimeBase(val.value)}
          />
          <Button variant="contained" color="black" className={classes.button}>
            More filters
          </Button>
        </div>
      </div>
    );
  } else if (type === 'account-managers') {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
          <p className="welcomeMessage__name">{subTitle}</p>
        </div>
        <div className="dashboard__buttons">{props.children}</div>
      </div>
    );
  } else if (type === 'account-timeline') {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
          <p className="welcomeMessage__name">{subTitle}</p>
        </div>
        <div className="dashboard__buttons">
          <Select
            options={tlCmsOptions}
            placeholder="All CSMs"
            styles={selectButtonCls}
          />
          <Select
            options={timeline_select_options}
            placeholder="Accounts: All"
            styles={selectButtonCls}
            onChange={onSelectChange}
          />
        </div>
      </div>
    );
  } else if (title === 'Admin') {
    if (type === 'AdminSensors') {
      return (
        <div className="dashboard__header">
          <div className="dashboard__welcomeMessage welcomeMessage">
            <h3 className="welcomeMessage__title">{title}</h3>
          </div>
          <div className="revenue__buttons">
            <TeamsCreateModal
              buttonLabel="+ Add New Company"
              className="TeamsCreateModalCustomCss"
              type="companies"
            />
          </div>
        </div>
      );
    } else if (type === 'AdminUsers') {
      return (
        <div className="dashboard__header">
          <div className="dashboard__welcomeMessage welcomeMessage">
            <h3 className="welcomeMessage__title">{title}</h3>
          </div>
          <div className="revenue__buttons">
            {/* <div style={{ marginRight: '24px' }}>
              <CreateBulkModal
                buttonLabel="+ Add New Users in Bulk"
                className="bulk__modal"
              />
            </div> */}
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
    } else if (type === 'AdminTeams') {
      return (
        <div className="dashboard__header">
          <div className="dashboard__welcomeMessage welcomeMessage">
            <h3 className="welcomeMessage__title">{title}</h3>
          </div>
          <div className="revenue__buttons">
            <TeamsCreateModal
              buttonLabel="+ Create New Team"
              className="TeamsCreateModalCustomCss"
              type="team"
            />
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
  } else if (type === 'Alerts') {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
        </div>
        <div
          className="dashboard__buttons"
          style={{ maxWidth: '460px', justifyContent: 'flex-end' }}>
          <DrawerForm type="report" title="+ Create New Report" />
          <DrawerForm type="alert" title="+ Create New Alert" />
        </div>
      </div>
    );
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
  } else if (type === 'Actions') {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage d-flex justify-content-center align-items-center">
          <img src={actionImg} alt="signal " className="signal mr-3" />

          <h3 className="welcomeMessage__title">{title}</h3>
        </div>
        <div
          className="dashboard__buttons"
          style={{ maxWidth: '460px', justifyContent: 'flex-end' }}>
          <DrawerForm type="report" title="+ Create New Action" />
          <DrawerForm type="alert" title="+ Create New Alert" />
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
