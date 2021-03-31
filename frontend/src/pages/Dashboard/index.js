import React, { useContext, useState, useEffect } from 'react';
import StatCard from './StatCard';
import SmallCharts from './SmallCharts';
import BarChart from './BarChart';

import { StateContext } from '../../StateContextProvider';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import Header from './Header';
import SimpleTable from '../../components/SimpleTable';
import SensorsTable from '../../components/SensorsTable';
import DashboardService from '../../services/DashboardService';

const Dashboard = () => {
  let loggedInUser = localStorage.getItem('username');
  const [{ user }] = useContext(StateContext);
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    focusedInput: null
  });
  const [data, setData] = useState({
    activeSensor: 23,
    alertSensor: 0,
    activeGateway: 0,
    alertGateway: 0,
    sensors: 0
  });
  let firstName = loggedInUser ? loggedInUser.split(' ') : '-';

  useEffect(() => {
    DashboardService.getActiveSensors()
      .then((res) => {
        console.log('res is ', res.data[0].activeSensor);
        setData({
          activeSensor: res.data.length,
          alertSensor: 0,
          activeGateway: 0,
          alertGateway: 0,
          sensors: res.data
        });
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);

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
          main={data.activeSensor}
          grid={1}
          icon="SignalCellularAltOutlinedIcon"
        />
        <StatCard
          title="Alerting Sensors"
          main={data.alertSensor}
          grid={2}
          icon="NotificationsActiveOutlinedIcon"
        />
        <StatCard
          title="Active Gateways"
          main={data.activeGateway}
          grid={3}
          icon="SettingsInputAntennaOutlinedIcon"
        />
        <StatCard
          title="Alerting Gateways"
          main={data.alertGateway}
          grid={4}
          icon="NotificationsActiveOutlinedIcon"
        />
      </div>
      {/* <SimpleTable /> */}
      <SensorsTable sensors={data.sensors} />
    </div>
  );
};

export default Dashboard;
