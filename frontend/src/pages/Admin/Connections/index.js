import React, { useState, useEffect } from 'react';
import ConnectionsService from './../../../services/ConnectionsService';
import AdminService from '../../../services/AdminService';
import { connect } from 'react-redux';
import loadingGif from '../../../assets/gif/loading.gif';

const Connections = (props) => {
  const [googleApi, setGoogleApi] = useState('');
  const [url, setUrl] = useState('');
  const [logUrl, setLogUrl] = useState('');
  const [loadStatus, setLoadStatus] = useState(false);
  const [database_googleApi, setDatabase_googleApi] = useState('');
  const [database_url, setDatabase_url] = useState('');
  const [companyId, setCompanyId] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    AdminService.getLogUrl()
      .then((res) => {
        console.log('res is ', res);
        setLogUrl(res.data[0].logUrl);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
    AdminService.checkLogData()
      .then((res) => {
        console.log('res is ', res.data.length);
        res.data.length === '0' ? setLoadStatus(true) : setLoadStatus(false);
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
      .then((res) => {
        console.log(res);
        alert('successfully inserted');
      })
      .catch((err) => {
        setPageLoading(false);
        console.log('Error:', err);
        alert('Error:', err);
      });
  };

  const removeGoogleSheet = () => {
    if (companyId) {
      var data = {
        companyId: companyId,
        googleSheetUrl: url
      };
      ConnectionsService.removeGoogleSheet(companyId)
        .then((res) => {
          // console.log(res.data);
          setDatabase_url(res.data.googleSheet);
          setUrl('');
          alert('successfully removed');
        })
        .catch((err) => {
          console.log('Error:', err);
          alert('Error:', err);
        });
    }
  };

  const updateGoogleSheet = () => {
    if (googleApi) {
      if (url) {
        setPageLoading(true);
        if (companyId) {
          var data = {
            companyId: companyId,
            googleSheetUrl: url
          };
          ConnectionsService.updateGoogleSheet(data)
            .then((res) => {
              setDatabase_url(res.data.googleSheet);
              setUrl(res.data.googleSheet);
              setPageLoading(false);
              // console.log(res.data);
              alert('successfully updated');
            })
            .catch((err) => {
              setPageLoading(false);
              console.log('Error:', err);
              alert('Failed');
            });
        }
      } else alert('please Update URL');
    } else alert('first insert API');
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

          {loadStatus ? (
            <div className="d-flex">
              <button
                className="button button--block-admin-connections1 button-outlined"
                onClick={removeGoogleSheet}>
                Disconnect
              </button>
              <button
                className="button button--block-admin-connections1 button-primary"
                onClick={updateGoogleSheet}>
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

const mapStateToProps = ({ dashboard_header: { set_connection_company } }) => ({
  set_connection_company
});

const mapDispatchToProps = ({
  dashboard_header: { updateConnectionState }
}) => ({
  updateConnectionState: (value) => updateConnectionState(value)
});

export default connect(mapStateToProps, mapDispatchToProps)(Connections);
