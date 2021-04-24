import React, { useState, useEffect } from 'react';
import StatCard from '../../components/StatCard/index';
import SensorService from '../../services/SensorService';
import Header from '../Dashboard/Header';

import { connect } from 'react-redux';

const Notifications = (props) => {
  const [page, setPage] = useState(0);
  const [usersList, setUsersList] = useState([]);

  const noOfDatasInTable = 6;
  const noOfPages = parseInt(usersList.length / noOfDatasInTable);
  const dataInTable = usersList.slice(
    page * noOfDatasInTable,
    page * noOfDatasInTable + noOfDatasInTable
  );

  const paginationComponent = () => {
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

  useEffect(() => {
    SensorService.getAllSensors()
      .then((res) => {
        console.log('state change:', res);
        setUsersList(res.data);
        props.updateState(false);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);

  return (
    <div className="dashboard revenue-insights">
      <Header title="Notifications" type="Notifications" />
      <div className="revenue-insights__statsGrid adminTeams">
        {dataInTable.map((company, index) => (
          <StatCard
            key={index}
            title={company.deviceName}
            temp1={company.temp1}
            temp2={company.temp2}
            recentTime={company.includeDateTime}
            voltage={company.voltage}
            battery_status={company.battery_status}
            grid={index + 1}
            page="notifications"
            companyId={company.id}
          />
        ))}
      </div>
      {noOfPages >= 1 ? paginationComponent() : null}
    </div>
  );
};

const mapDispatchToProps = ({ company: { updateState } }) => ({
  updateState: (value) => updateState(value)
});

const mapStateToProps = ({ sensor: { set_create_company } }) => ({
  set_create_company
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
