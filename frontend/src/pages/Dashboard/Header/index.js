import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select, { components } from 'react-select';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import AddIcon from '@material-ui/icons/Add';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import SvgIcon from '@material-ui/core/SvgIcon';
import Popover from '@material-ui/core/Popover';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import { DateRangePicker } from 'react-dates';
import UnAvailableToolTip from '../../Components/TooltipComponents/UnAvailableTooltipComponent';
import DrawerForm from '../../AlertsReports/DrawerForm';
import TeamsCreateModal from '../../Admin/Modal/CompaniesTeamsModal/CreateModal/index';
import UserCreateModal from '../../Admin/Modal/UsersModal/Create/';
import CreateBulkModal from '../../Admin/Modal/UsersModal/CreateBulkModal';
import SelectSearch from '../../../components/SelectSearch';
import ArrowDown from '../../../assets/svg/arrow-down.svg';
import GoogleSheetsIcon from '../../../assets/svg/google-sheets-icon.svg';
import SalesforcseIcon from '../../../assets/svg/salesforcse-icon.svg';
import CompanyService from '../../../services/CompanyService';
import RevenueService from '../../../services/RevenueService';

import './header.scss';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const companies_options = [
  { value: 'SMNorthwest Co.B', label: 'Northwest Co.' },
  { value: 'Balenciaga', label: 'Balenciaga' },
  { value: 'Off White', label: 'Off White' }
];

const segments_options = [
  { value: null, label: 'Segments: All' },
  { value: 'SMB', label: 'SMB' },
  { value: 'Mid', label: 'Mid' },
  { value: 'Enterprise', label: 'Enterprise' }
];

const top_options = [
  { value: null, label: 'Top: All' },
  { value: 'Top 10', label: 'Top 10' },
  { value: 'Top 15', label: 'Top 15' },
  { value: 'Top 20', label: 'Top 20' },
  { value: 'Top 25', label: 'Top 25' },
  { value: 'Top 10%', label: 'Top 10%' },
  { value: 'Top 15%', label: 'Top 15%' },
  { value: 'Top 20%', label: 'Top 20%' },
  { value: 'Top 25%', label: 'Top 25%' }
];

const monthly_options = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annual', label: 'Annual' }
];

const top100Films = [
  { title: 'chocolate' },
  { title: 'strawberry' },
  { title: 'vanilla' }
];

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

// const options_segments = [
//   { value: "enterprise", label: "Enterprise" },
//   { value: "mid", label: "Mid" },
//   { value: "smb", label: "SMB" }
// ];

const viewing_options = [
  { value: 'summary', label: 'Summary' },
  { value: 'account', label: 'Account' },
  { value: 'account_by_period', label: 'Account By Period' },
  { value: 'am_by_period', label: 'Account Manager By Period' }
];

const heatmap_select_options = [
  { value: 'Showing: Top 5 Accounts', label: 'Showing: Top 5 Accounts' },
  { value: 'Showing: Top 10 Accounts', label: 'Showing: Top 10 Accounts' },
  { value: 'Showing: Top 15 Accounts', label: 'Showing: Top 15 Accounts' }
];
const timeline_select_options = [
  { value: '5', label: 'Showing: Top 5 Accounts' },
  { value: '10', label: 'Showing: Top 10 Accounts' },
  { value: '15', label: 'Showing: Top 15 Accounts' }
];
const tlCmsOptions = [];

const presentationOptions = [];

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
    setAnchorEl(event.currentTarget);
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
    RevenueService.getRevenueCompanies()
      .then((res) => {
        // console.log('state changeaaa:', res.data);
        var array = [
          {
            value: null,
            label: 'All'
          }
        ];
        res.data.map((company) => {
          let element = {
            value: company.title,
            label: company.title
          };
          array.push(element);
        });
        setRevenueCompanies(array);
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

  const handleCompany = (value) => {
    setSelectCompany(value);
    props.updateConnectionState(value);
  };

  const select_revenucompany = (e) => {
    // console.log(e);
    if (activetab === 'Contracts') {
      props.updateContractState(e.value);
      setRevenue_Company(e);
    } else if (activetab === 'Contracts Waterfall') {
      props.updateWaterfallState(e.value);
      setRevenue_Company(e);
    }
  };

  const select_segment = (e) => {
    console.log(e.value);
    props.updateInsightArrSegmentState(e.value);
  };

  if (type === undefined) {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
          <p className="welcomeMessage__name">{subTitle}</p>
        </div>
        <div className="revenue__buttons">
          <Select
            classNamePrefix="select-react"
            className="revenue_companies"
            options={companies_options}
            placeholder="Companies: All"
            // onChange={select_revenucompany}
            // value={revenue_company}
          />
          <Select
            classNamePrefix="select-react"
            className="revenue_segments"
            options={segments_options}
            placeholder="Segments: All"
            // onChange={select_segment}
          />
          <Select
            classNamePrefix="select-react"
            className="dashboard_accounts"
            options={top_options}
            placeholder="Showing: All Accounts"
          />
          <Select
            classNamePrefix="select-react"
            className="revenue_monthly"
            options={monthly_options}
            placeholder="Monthly"
          />
          {/* <Select options={options} placeholder="All Segements" />
          <Select options={options} placeholder="All Companies" />
          <DateRangePicker
            small={true}
            startDate={date.startDate}
            startDatePlaceholderText="Date"
            endDatePlaceholderText="Range"
            startDateId="application-startdate"
            endDate={date.endDate}
            endDateId="application-enddate"
            showDefaultInputIcon={false}
            customInputIcon={''}
            onDatesChange={({ startDate, endDate }) =>
              setDate({ ...date, startDate, endDate })
            }
            focusedInput={date.focusedInput}
            onFocusChange={(focusedInput) => setDate({ ...date, focusedInput })}
          />
          <div className="dashboard__statsRangeSelect">
            <p className="dashboard__statsRangeItem--selected">Monthly</p>
            <p>Quarterly</p>
            <p>Annual</p>
          </div> */}
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
  } else if (type === 'Revenue-Management') {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
          <p className="welcomeMessage__name">{subTitle}</p>
        </div>
        <div className="revenue__buttons">
          {activetab === 'Contracts' ? (
            <div style={{ display: 'flex' }}>
              <UnAvailableToolTip
                style={{ display: 'flex' }}
                title="Not available in beta!">
                <button
                  className="button button--block-outline button-mr button--disabled"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}>
                  + Connect
                  <MoreHorizIcon
                    className="dots-btn"
                    style={{ marginLeft: '1.1rem' }}
                  />
                </button>
              </UnAvailableToolTip>
              <UnAvailableToolTip
                style={{ display: 'flex' }}
                title="Not available in beta!">
                <button className="button button--block icon-between button--disabled">
                  Import
                  <SystemUpdateAltIcon style={{ marginLeft: '2.5rem' }} />
                </button>
              </UnAvailableToolTip>
              <Popover
                className="select-menu-popover"
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}>
                <button
                  onClick={handleClose}
                  className="button button--block-outline">
                  + Connect Salesforce
                  <img src={SalesforcseIcon} alt="icon" />
                </button>
                <button
                  onClick={handleClose}
                  className="button button--block-outline">
                  + Connect Google Sheets
                  <img src={GoogleSheetsIcon} alt="icon" />
                </button>
              </Popover>
            </div>
          ) : activetab === 'Summary' ? (
            <>
              <button className="button button--block-outline">
                Export to XLSX
              </button>
              <Select
                classNamePrefix="select-react"
                className="revenue_monthly"
                options={monthly_options}
                // defaultValue={monthly_options[0]}
                placeholder="Monthly"
              />
            </>
          ) : (
            <>
              {/* <SelectSearch
                    dataOptions={revenueCompanies}
                    width="180px"
                  /> */}
              <Select
                classNamePrefix="select-react"
                className="revenue_companies"
                options={revenueCompanies}
                placeholder="Companies: All"
                onChange={select_revenucompany}
                value={revenue_company}
              />
              <Select
                classNamePrefix="select-react"
                className="revenue_segments"
                options={segments_options}
                placeholder="Segments: All"
                onChange={select_segment}
              />
              <Select
                classNamePrefix="select-react"
                className="revenue_top"
                options={top_options}
                placeholder="Top: All"
              />
              <Select
                classNamePrefix="select-react"
                className="revenue_monthly"
                options={monthly_options}
                placeholder="Monthly"
              />
            </>
          )}
        </div>
      </div>
    );
  } else if (type === 'Revenue-Churn') {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
          <p className="welcomeMessage__name">{subTitle}</p>
        </div>
        <div className="dashboard__buttons">
          <Select options={options} placeholder="Companies: All" />
          <Select options={options} placeholder="Segments: All" />
          <Select options={options} placeholder="Showing: Top 15% Accounts" />
          <Select options={options} placeholder="Monthly" />
        </div>
      </div>
    );
  } else if (type === 'Revenue-Ar') {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
          <p className="welcomeMessage__name">{subTitle}</p>
        </div>
        <div className="dashboard__buttons">
          <Select options={options} placeholder="Companies: All" />
          <Select options={options} placeholder="Segments: All" />
          <Select options={options} placeholder="Showing: Top 15% Accounts" />
          <Select options={options} placeholder="Monthly" />
        </div>
      </div>
    );
  } else if (type === 'account-management-accounts') {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
          <p className="welcomeMessage__name">{subTitle}</p>
        </div>
        <div className="dashboard__buttons">
          <Select options={options} placeholder="Accounts: All" />
          <Select options={options} placeholder="Segments: All" />
          <Select options={options} placeholder="CSMs: All" />
          <Select options={options} placeholder="Monthly" />
          <Select options={viewing_options} placeholder="Viewing by Period" />
        </div>
      </div>
    );
  } else if (type === 'account-management-heatmap') {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
          <p className="welcomeMessage__name">{subTitle}</p>
        </div>
        <Select
          options={heatmap_select_options}
          styles={selectButtonCls}
          placeholder="Showing: Top 5 Accounts"
        />
      </div>
    );
  } else if (type === 'account-management-tasklist') {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
          <p className="welcomeMessage__name">{subTitle}</p>
        </div>

        {/*dashboard__rightbuttons*/}
        <div className="dashboard__buttons task-list">
          {/* <Select options={options} placeholder="CSMs: All" styles={selectButtonCls}/> */}
          <Select
            options={options}
            classNamePrefix="select-react"
            placeholder="Top: All"
          />
          <Select
            options={options}
            classNamePrefix="select-react"
            placeholder="Accounts: All"
          />
          <Select
            options={options}
            classNamePrefix="select-react"
            placeholder="Task: All"
          />
          <Select
            options={options}
            classNamePrefix="select-react"
            placeholder="CSMs: All"
          />

          <button
            onClick={createTask}
            className="button button--block-tasklist button-primary">
            <p>+ Create New Task</p>
          </button>

          {/*<Autocomplete*/}
          {/*  id="ACOUNTs"*/}
          {/*  options={top100Films}*/}
          {/*  getOptionLabel={(option) => option.title}*/}
          {/*  className="autoAcounts"*/}
          {/*  popupIcon={<img src={ArrowDown} alt="arrow down" />}*/}
          {/*  renderInput={(params) => (*/}
          {/*    <TextField*/}
          {/*      className="acountInput"*/}
          {/*      {...params}*/}
          {/*      label="Acounts: All"*/}
          {/*      variant="outlined"*/}
          {/*    />*/}
          {/*  )}*/}
          {/*/>*/}

          {/*<Autocomplete*/}
          {/*  id="TASKs"*/}
          {/*  options={top100Films}*/}
          {/*  getOptionLabel={(option) => option.title}*/}
          {/*  className="autoTasks"*/}
          {/*  popupIcon={<img src={ArrowDown} alt="arrow down" />}*/}
          {/*  renderInput={(params) => (*/}
          {/*    <TextField*/}
          {/*      className="acountTask"*/}
          {/*      {...params}*/}
          {/*      label="Task: All"*/}
          {/*      variant="outlined"*/}
          {/*    />*/}
          {/*  )}*/}
          {/*/>*/}

          {/*<Autocomplete*/}
          {/*  id="CSMs"*/}
          {/*  options={top100Films}*/}
          {/*  getOptionLabel={(option) => option.title}*/}
          {/*  className="autoCSMs"*/}
          {/*  popupIcon={*/}
          {/*    <img className="autoSVG" src={ArrowDown} alt="arrow down" />*/}
          {/*  }*/}
          {/*  renderInput={(params) => (*/}
          {/*    <TextField*/}
          {/*      className="acountCSM"*/}
          {/*      {...params}*/}
          {/*      label="CSMs: All"*/}
          {/*      variant="outlined"*/}
          {/*    />*/}
          {/*  )}*/}
          {/*/>*/}
        </div>
      </div>
    );
  } else if (title === 'Admin') {
    if (type === 'AdminCompanies') {
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
    } else if (type === 'AdminSensors') {
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
            <div style={{ marginRight: '24px' }}>
              <CreateBulkModal
                buttonLabel="+ Add New Users in Bulk"
                className="bulk__modal"
              />
            </div>
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

          <Select
            className="company_select"
            value={selectCompany}
            placeholder={
              <div className="place_font">
                <SearchIcon />
                Select a Company
              </div>
            }
            onChange={handleCompany}
            options={companyOptions}
            styles={{
              dropdownIndicator: (provided, state) => ({
                ...provided,
                transform: state.selectProps.menuIsOpen && 'rotate(180deg)'
              })
            }}
          />
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
  } else if (type === 'presentation') {
    return (
      <div className="dashboard__header">
        <div className="dashboard__welcomeMessage welcomeMessage">
          <h3 className="welcomeMessage__title">{title}</h3>
        </div>
        <div className="dashboard__buttons" style={{ maxWidth: '460px' }}>
          <SelectSearch
            dataOptions={props.presentationNames}
            width="236px"
            placeholder="Search Presentations"
          />
          <Select
            options={props.presentationOptions}
            placeholder="Date: Most Recent"
          />
        </div>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
