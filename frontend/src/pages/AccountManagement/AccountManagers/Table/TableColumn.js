import React from 'react';
import { IconButton, Popover, Avatar } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CustomDropDown from '../DropDown';

function TableColumn(props) {
  let { managers, accounts } = props;
  const findAccountManagers = (accountName) => {
    let index = accounts.findIndex(
      (account) => account.Company === accountName
    );
    if (index > -1) {
      return accounts[index].managers.split(',');
    }
    return [];
  };

  return [
    {
      name: 'Company',
      label: 'Account Name',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="account-manager-display account-manager-name">
              {value}
            </div>
          );
        }
      }
    },
    {
      name: 'AccountManager',
      label: 'Account Manager',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <CustomDropDown
              key={tableMeta.rowData[1]}
              withToggle={true}
              managers={managers}
              accountsManaged={findAccountManagers(tableMeta.rowData[0])}
              accountManager={tableMeta.rowData[1]}>
              <div className="account-manager-container">
                <Avatar className="manager-icon"></Avatar>
                {value}
              </div>
            </CustomDropDown>
          );
        }
      }
    },
    {
      name: 'email',
      label: 'E-mail Address',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="account-manager-display">
              {value ? value : '---'}
            </div>
          );
        }
      }
    },
    {
      name: 'options',
      label: 'Options',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="acm-options">
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </div>
          );
        }
      }
    }
  ];
}
export default TableColumn;
