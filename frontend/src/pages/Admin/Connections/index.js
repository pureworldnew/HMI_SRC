import React, { useState, useEffect } from 'react';
import AdminService from '../../../services/AdminService';
import loadingGif from '../../../assets/gif/loading.gif';

const Connections = (props) => {
  const [logUrl, setLogUrl] = useState('');
  const [loadStatus, setLoadStatus] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    AdminService.getLogUrl()
      .then((res) => {
        setLogUrl(res.data[0].logUrl);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
    AdminService.checkLogData()
      .then((res) => {
        console.log('res is ', res.data.length);
        res.data.length !== 0 ? setLoadStatus(true) : setLoadStatus(false);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);

  const updateLogUrl = (type) => {
    if (type === 'remove') {
      console.log('remove connect');
      AdminService.removeLogUrl(logUrl)
        .then((res) => {})
        .catch((err) => {
          console.log('Error:', err);
        });
      setLogUrl('');
    } else if (type === 'add') {
      if (logUrl === '') {
        alert('Please enter the Log URL!');
      }
      AdminService.addLogUrl(logUrl)
        .then((res) => {
          console.log('res is ', res);
        })
        .catch((err) => {
          console.log('Error:', err);
        });
    }
  };

  const loadLogData = () => {
    if (!logUrl) alert('Please set the Log URL for the log data');
    setPageLoading(true);
    AdminService.insertLogData(logUrl)
      .then(() => {
        setPageLoading(false);
        setLoadStatus(true);
        console.log('here is inside');
        alert('successfully inserted');
      })
      .catch((err) => {
        setPageLoading(false);
        console.log('Error:', err);
        alert('Error:', err);
      });
    console.log('here is outside');
  };

  const removeLogData = () => {
    setPageLoading(true);
    AdminService.removeLogData()
      .then(() => {
        console.log('here is inside of remove action');

        setPageLoading(false);
        setLoadStatus(false);
        alert('successfully removed');
      })
      .catch((err) => {
        setPageLoading(false);
        console.log('Error:', err);
        alert('Error:', err);
      });
    console.log('here is outside of remove');
  };

  const refreshLogData = () => {
    setPageLoading(true);
    setTimeout(function () {
      setPageLoading(false);
      alert('Refresh Done');
    }, 3000);
  };

  return (
    <div className="panel terminology">
      <div className="panel-header terminology">
        <div className="panel-name terminology">
          Sensor Log URL Set / Import
        </div>
      </div>
      {pageLoading ? (
        <div className="panel-body terminology d-flex justify-content-center align-items-center">
          <img className="pb-5 mb-5" src={loadingGif} alt="loader gif" />
        </div>
      ) : (
        <div className="panel-body terminology">
          <div className="input-control" style={{ display: 'grid' }}>
            <label>Enter the sensor log URL</label>
            <input
              type="text"
              value={logUrl}
              onChange={(e) => setLogUrl(e.target.value)}
            />
          </div>

          {logUrl ? (
            <div className="d-flex">
              <button
                className="button button--block-admin-connections1 mb-5 button-outlined"
                onClick={() => updateLogUrl('remove')}>
                Disconnect
              </button>
              <button
                className="button button--block-admin-connections1 mb-5 button-primary"
                onClick={() => updateLogUrl('add')}>
                Save
              </button>
            </div>
          ) : (
            <button
              className="button button--block-admin-connections mb-5 button-primary"
              onClick={() => updateLogUrl('add')}>
              Add
            </button>
          )}

          <div className="input-control" style={{ display: 'grid' }}>
            <label>Import Logs from link into Database</label>
            <input type="text" value={logUrl} readOnly placeholder="" />
          </div>

          {loadStatus === true ? (
            <div className="d-flex">
              <button
                className="button button--block-admin-connections1 button-outlined"
                onClick={removeLogData}>
                Disconnect
              </button>
              <button
                className="button button--block-admin-connections1 button-primary"
                onClick={refreshLogData}>
                Refresh
              </button>
            </div>
          ) : (
            <button
              className="button button--block-admin-connections button-primary"
              onClick={loadLogData}>
              Connect
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Connections;
