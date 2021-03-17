import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, makeStyles } from '@material-ui/core';
import Header from '../../Dashboard/Header';
import ManagersTable from './Table';
import UnAvailableToolTip from '../../Components/TooltipComponents/UnAvailableTooltipComponent';

const useStyles = makeStyles({
  root: {
    height: 56,
    textTransform: 'capitalize',
    backgroundColor: '#1C5DE1',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 600,
    fontStyle: 'normal',
    '&:hover': {
      backgroundColor: '#1C5DE1'
    },
    '&:nth-child(1)': {
      marginRight: 24,
      minWidth: 205
    }
  },
  disabled: {
    backgroundColor: '#999da3',
    '&:hover': {
      backgroundColor: '#999da3'
    }
  }
});

const AccountManagers = ({ accounts, managers, ...props }) => {
  let classes = useStyles();
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    focusedInput: null
  });
  const onSelectChange = (event) => {};

  useEffect(() => {
    props.getAccountManagers();
  }, []);

  return (
    <div className="dashboard managers">
      <Header
        title="Account Management"
        subTitle="Account Managers"
        date={date}
        setDate={setDate}
        type={'account-managers'}>
        <UnAvailableToolTip
          style={{ display: 'flex' }}
          title="Not available in beta!">
          <Button classes={classes} className={classes.disabled}>
            + Add New Users in Bulk
          </Button>
        </UnAvailableToolTip>
        <Button className={classes.root}>+ Add New User</Button>
      </Header>

      <div className="managers-container">
        <div className="table-header position-absolute">
          <div className="table-name"></div>
        </div>
        <div className="table-container">
          <ManagersTable
            accounts={accounts}
            managers={managers}
          />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  let { accountManagers } = state;
  return {
    accounts: accountManagers.accounts,
    managers: accountManagers.managers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAccountManagers: dispatch.accountManagers.getAccountManagers
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagers);
