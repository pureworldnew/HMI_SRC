import React, { useContext, useState } from 'react';
import StatCard from './StatCard';
import SmallCharts from './SmallCharts';
import BarChart from './BarChart';

import { StateContext } from '../../StateContextProvider';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import Header from './Header';
import SimpleTable from '../../components/SimpleTable';
import SensorsTable from '../../components/SensorsTable';
const data = {
  revenue: 23,
  revenuePrev: 22,
  netRevenueRetention: 45,
  logoRetentionRate: 32,
  accountsReceivable: 213
};

const Dashboard = () => {
  let loggedInUser = localStorage.getItem('username');
  const [{ user }] = useContext(StateContext);
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    focusedInput: null
  });
  let firstName = loggedInUser ? loggedInUser.split(' ') : '-';

  return (
    <div className="dashboard">
      <Header
        title="Welcome home,"
        subTitle={firstName.length && firstName[0]}
        date={date}
        setDate={setDate}
      />

      <div className="dashboard__statsGrid">
        <StatCard
          title="Active Sensors"
          main={data.revenue}
          grid={1}
          icon="SignalCellularAltOutlinedIcon"
        />
        <StatCard
          title="Alerting Sensors"
          main={data.netRevenueRetention}
          grid={2}
          icon="NotificationsActiveOutlinedIcon"
        />
        <StatCard
          title="Active Gateways"
          main={data.logoRetentionRate}
          grid={3}
          icon="SettingsInputAntennaOutlinedIcon"
        />
        <StatCard
          title="Alerting Gateways"
          main={data.accountsReceivable}
          grid={4}
          icon="NotificationsActiveOutlinedIcon"
        />
      </div>
      <SimpleTable />
      <SensorsTable />
    </div>
  );
};

export default Dashboard;
