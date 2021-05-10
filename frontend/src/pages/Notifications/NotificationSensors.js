import React, { useState, useEffect } from 'react';
import StatCard from '../../components/StatCard/index';
import SensorService from '../../services/SensorService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUpload } from '@fortawesome/free-solid-svg-icons';
import signalImg from '../../assets/img/signal.png';
const NotificationSensors = (props) => {
  const [page, setPage] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

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
    setPageLoading(true);
    SensorService.getAllSensors()
      .then((res) => {
        console.log('state changeweqwe:', res);
        setUsersList(res.data);
        setPageLoading(false);
        props.updateState(false);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);

  return (
    <div>
      <div
        className="card"
        style={{
          boxShadow:
            '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
          borderRadius: '4px'
        }}>
        <h5 className="card-header">Action Name</h5>
        <div className="card-body">
          <input
            className="w-100"
            style={{ fontSize: '24px' }}
            type="text"
            value="Temperature Data Greater Than 56 F"
            placeholder="Temperature Data Greater Than 56 F"></input>
          <button
            className="btn btn-primary btn-lg mx-auto my-4"
            style={{
              minWidth: '16rem',
              minHeight: '4rem',
              fontSize: '1.5rem'
            }}>
            <FontAwesomeIcon icon="check-square" />
            Save
            <FontAwesomeIcon icon={faSave} className="ml-4" />
          </button>
        </div>
      </div>
      <div
        className="card"
        style={{
          boxShadow:
            '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
          borderRadius: '4px'
        }}>
        <h5 className="card-header">
          <img src={signalImg} alt="signal " className="signal mr-3" />
          Action Sensors
        </h5>
        <div className="card-body">
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
                page="notifications_settings"
                companyId={company.id}
              />
            ))}
          </div>
          {noOfPages >= 1 ? paginationComponent() : null}
          <div className="d-flex text-center">
            <button
              className="btn btn-primary btn-lg mx-auto my-4"
              style={{
                minWidth: '16rem',
                minHeight: '4rem',
                fontSize: '1.5rem'
              }}>
              Complete
              <FontAwesomeIcon icon={faUpload} className="ml-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSensors;
