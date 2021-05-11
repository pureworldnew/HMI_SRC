import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Dashboard/Header';
import StatCard from '../../components/StatCard/index';
import SensorService from '../../services/SensorService';
import loadingGif from '../../assets/gif/loading.gif';
import Modal from '../../components/Modal';

function NotificationLists({ ...props }) {
  const dispatch = useDispatch();
  const roleId = window.localStorage.getItem('roleId');
  const alerts = useSelector((state) => state.alerts.data);
  const { alertsActive, alertsPaused } = useSelector((state) => state.alerts);
  const loading = useSelector((state) => state.loading.models.alerts);
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [activeRow, setActiveRow] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [data, setDate] = useState([]);

  useEffect(() => {
    dispatch.alerts.getAllAlerts();
  }, []);

  useEffect(() => {
    setDate(alerts);
  }, [alerts]);

  const columns = [
    {
      name: 'id',
      options: {
        display: 'false'
      }
    },
    {
      name: 'alertName',
      label: 'Alert / Report Name',
      options: {
        sort: false
      }
    },
    {
      name: 'recipients',
      label: 'Recipients',
      options: {
        sort: false
      }
    },
    {
      name: 'status',
      label: 'STATUS',
      options: {
        sort: false
      }
    },
    {
      name: 'options',
      label: 'OPTIONS',
      options: {
        sort: false
      }
    }
  ];

  const deleteReport = async () => {
    await dispatch.alerts.deleteAlertById(activeRow);
    await dispatch.alerts.getAllAlerts();
    await setModalShow(null);
    await setActiveRow(null);
  };

  const pauseReport = async () => {
    let item = alerts.filter((key) => key.id === activeRow)[0];
    let status = !item.status;
    const formData = { id: activeRow, status };
    await dispatch.alerts.editAlertById(formData);
    await dispatch.alerts.getAllAlerts();
    await setModalShow(null);
    await setActiveRow(null);
  };

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
    <div className="dashboard revenue-insights">
      <Header
        title="Notifications Lists"
        type="Notification_lists"
        activetab={activeTab}
      />
      {pageLoading ? (
        <div className="panel-body terminology d-flex justify-content-center align-items-center">
          <img className="pb-5 mb-5" src={loadingGif} alt="loader gif" />
        </div>
      ) : (
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
              page="notification_lists"
              companyId={company.id}
            />
          ))}
        </div>
      )}
      {noOfPages >= 1 ? paginationComponent() : null}
      <Modal
        title="Report edit"
        modalShow={modalShow === 'edit'}
        onClose={() => setModalShow(false)}
        footerBtnControl={true}
        btnTitle={['Confirm', 'Close']}
      />
      <Modal
        title="Report pause"
        modalShow={modalShow === 'pause'}
        onClose={() => setModalShow(false)}
        content="Please confirm if you really want pause report."
        footerBtnControl={true}
        btnTitle={['Confirm', 'Close']}
        onConfirm={() => pauseReport()}
      />
      <Modal
        title="Report delete"
        modalShow={modalShow === 'delete'}
        onClose={() => setModalShow(false)}
        content="Please confirm if you really want delete report."
        footerBtnControl={true}
        btnTitle={['Confirm', 'Close']}
        onConfirm={() => deleteReport()}
      />
    </div>
  );
}

export default NotificationLists;
