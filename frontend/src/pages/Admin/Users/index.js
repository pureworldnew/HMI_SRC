import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PopoverItem from './PopOverComponent/PopOverComponent';
import UserTable from './UserTableComponent/UserTable';
import CompanyUserTable from './UserTableComponent/CompanyUserTable';

import UserService from './../../../services/UserService';

// Table header and data
const header = [
  {
    fullName: 'FULL NAME',
    emailAddress: 'E-MAIL ADDRESS',
    userId: 'USER ID',
    lastLogin: 'LAST LOGIN',
    createDate: 'CREATE DATE',
    roleName: 'ROLE'
  }
];

const companyHeader = [
  {
    fullName: 'FULL NAME',
    emailAddress: 'E-MAIL ADDRESS',
    userId: 'USER ID',
    lastLogin: 'LAST LOGIN',
    createDate: 'CREATE DATE',
    roleName: 'ROLE'
  }
];

const Users = (props) => {
  const [usersList, setUsersList] = useState([]);

  const { add_new_user } = props;
  const roleId = window.localStorage.getItem('roleId');

  useEffect(() => {
    UserService.getUsersList()
      .then((res) => {
        setUsersList(res.data);
        props.updateState(false, 'add_new_user');
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, [add_new_user, props]);

  const noOfDatasInTable = 5;
  const noOfPages = parseInt(usersList.length / noOfDatasInTable);
  const [page, setPage] = useState(0);

  // Table pagination function
  const tablePagination = () => {
    return (
      <div className="pagination" style={{ flex: 'auto' }}>
        <div
          className="pagination__prev"
          onClick={() => {
            if (page > 0) {
              setPage(page - 1);
            }
          }}>
          Previous
        </div>
        <div className="pagination__pages">
          <ul>
            {Array(noOfPages + 1)
              .fill('')
              .map((d, index) => (
                <li
                  key={index + 'sjlk'}
                  className={`pagination__page ${
                    index === page ? `pagination__page--active` : null
                  }`}
                  onClick={() => {
                    setPage(index);
                  }}>
                  {index + 1}
                </li>
              ))}
          </ul>
        </div>
        <div
          className="pagination__next"
          onClick={() => {
            if (page < noOfPages) {
              setPage(page + 1);
            }
          }}>
          Next
        </div>
      </div>
    );
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-name">User List</div>
        <div className="panel-toolbar">
          <label>
            <input type="text" name="search" placeholder="Search" />
          </label>
          <div className="panel-toolbar-more-menu">
            <PopoverItem key={0} placement="left" id={0} />
          </div>
        </div>
      </div>

      <div className="panel-body">
        {roleId < 2 ? (
          <UserTable
            header={header}
            data={usersList}
            page={page}
            noOfDatasInTable={noOfDatasInTable}
          />
        ) : (
          <CompanyUserTable
            header={companyHeader}
            data={usersList}
            page={page}
            noOfDatasInTable={noOfDatasInTable}
          />
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {tablePagination()}
      </div>
    </div>
  );
};

const mapDispatchToProps = ({ user: { updateState } }) => ({
  updateState: (value, name) => updateState(value, name)
});

const mapStateToProps = ({ user: { add_new_user } }) => ({
  add_new_user
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
