import React, { useContext, useState, useEffect } from 'react';
import StatCard from './StatCard';
import { StateContext } from '../../StateContextProvider';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import Header from './Header';
import SensorsTable from '../../components/SensorsTable';
import DashboardService from '../../services/DashboardService';
import loadingGif from '../../assets/gif/loading.gif';

const Dashboard = () => {
  let loggedInUser = localStorage.getItem('username');
  const [{ user }] = useContext(StateContext);
  const [pageLoading, setPageLoading] = useState(false);

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
    setPageLoading(true);
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
        setPageLoading(false);
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
      {pageLoading ? (
        <div className="panel-body terminology d-flex justify-content-center align-items-center">
          <img className="pb-5 mb-5" src={loadingGif} alt="loader gif" />
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
};

export default Dashboard;
