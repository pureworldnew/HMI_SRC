import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Dashboard/Header';
import HorizontalTab from '../Admin/HorizontalTab';
import Modal from '../../components/Modal';
import Table from './Table';
import UserService from '../../services/UserService';

function AlertsReports({ ...props }) {
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

  const getActiveTabContent = () => {
    if (activeTab === 'Upcoming') {
      return (
        <Table
          data={alertsActive}
          columns={columns}
          showModal={(data) => setModalShow(data)}
          setActiveRow={(activeRow) => setActiveRow(activeRow)}
        />
      );
    } else if (activeTab === 'Paused') {
      return (
        <Table
          data={alertsPaused}
          columns={columns}
          showModal={(data) => setModalShow(data)}
          setActiveRow={(activeRow) => setActiveRow(activeRow)}
        />
      );
    } else {
      return (
        <Table
          data={[]}
          columns={columns}
          showModal={(data) => setModalShow(data)}
          setActiveRow={(activeRow) => setActiveRow(activeRow)}
        />
      );
    }
  };
  return (
    <div className="dashboard revenue-insights">
      <Header title="Alerts & Reports" type="Alerts" activetab={activeTab} />
      <HorizontalTab
        tabs={['Upcoming', 'Paused', 'Archived']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {getActiveTabContent()}
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

export default AlertsReports;
