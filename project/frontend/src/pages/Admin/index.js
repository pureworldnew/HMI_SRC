import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import Header from '../Dashboard/Header';
import HorizontalTab from './HorizontalTab';
// Admin Components
import Users from './Users';
import Settings from './Settings';
import Connections from './Connections';

const Admin = (props) => {
  const [activeTab, setActiveTab] = useState('Users');

  const roleId = window.localStorage.getItem('roleId');

  const { full_table_view } = props;
  console.log('full table view state', full_table_view);

  if (roleId > 4) {
    props.history.push('/dashboard');
  }

  const getActiveTabContent = () => {
    if (activeTab === 'Users') {
      return <Users />;
    } else if (activeTab === 'Settings') {
      return <Settings />;
    } else {
      return <Connections />;
    }
  };

  const getActiveTabHeader = () => {
    if (activeTab === 'Users') {
      return <Header title="Admin" type="AdminUsers" />;
    } else if (activeTab === 'Settings') {
      return <Header title="Admin" type="AdminSettings" />;
    } else {
      return <Header title="Admin" type="AdminConnections" />;
    }
  };

  const masterAdminTab = ['Users', 'Settings', 'Connections'];

  const companyAdminTab = ['Settings'];

  return (
    <div className="dashboard revenue-insights">
      {full_table_view ? (
        <></>
      ) : (
        <div>
          {getActiveTabHeader()}
          {roleId < 2 ? (
            <HorizontalTab
              tabs={masterAdminTab}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : (
            <HorizontalTab
              tabs={companyAdminTab}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      )}
      {getActiveTabContent()}
    </div>
  );
};

const mapStateToProps = ({ table: { full_table_view } }) => ({
  full_table_view
});

export default connect(mapStateToProps, null)(Admin);
