import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import Header from '../Dashboard/Header';
import HorizontalTab from './HorizontalTab';
// Admin Components
import Companies from './Companies';
import Sensors from './Sensors';
import Users from './Users';
import Teams from './Teams';
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
    if (activeTab === 'Companies') {
      return <Companies />;
    } else if (activeTab === 'Users') {
      return <Users />;
    } else if (activeTab === 'Sensors') {
      return <Sensors />;
    } else if (activeTab === 'Teams') {
      return <Teams />;
    } else if (activeTab === 'Settings') {
      return <Settings />;
    } else {
      return <Connections />;
    }
  };

  const getActiveTabHeader = () => {
    if (activeTab === 'Companies') {
      return <Header title="Admin" type="AdminCompanies" />;
    } else if (activeTab === 'Sensors') {
      return <Header title="Admin" type="AdminSensors" />;
    } else if (activeTab === 'Users') {
      return <Header title="Admin" type="AdminUsers" />;
    } else if (activeTab === 'Settings') {
      return <Header title="Admin" type="AdminSettings" />;
    } else if (activeTab === 'Teams') {
      return <Header title="Admin" type="AdminTeams" />;
    } else {
      return <Header title="Admin" type="AdminConnections" />;
    }
  };

  const masterAdminTab = [
    'Sensors',
    'Companies',
    'Users',
    'Teams',
    'Settings',
    'Connections'
  ];

  const companyAdminTab = ['Users', 'Teams', 'Settings', 'Connections'];

  return (
    <div className="dashboard revenue-insights">
      {full_table_view ? (
        <></>
      ) : (
        <div>
          {getActiveTabHeader()}
          {roleId < 3 ? (
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
