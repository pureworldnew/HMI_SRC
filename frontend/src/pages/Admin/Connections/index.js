import React, { useState, useEffect } from 'react';
import ConnectionsService from './../../../services/ConnectionsService';
import ComapanyService from '../../../services/CompanyService';
import { connect } from 'react-redux';
import loadingGif from '../../../assets/gif/loading.gif';

const Connections = (props) => {
  const [googleApi, setGoogleApi] = useState('');
  const [url, setUrl] = useState('');
  const [database_googleApi, setDatabase_googleApi] = useState('');
  const [database_url, setDatabase_url] = useState('');
  const [companyId, setCompanyId] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    console.log(props.set_connection_company);
    let company = setCompany();
    console.log(company);
    if (company) {
      setDatabase_googleApi('');
      setUrl('');
      ComapanyService.getCompanyUsers(company)
        .then((res) => {
          // console.log('state change:', set_create_company);
          console.log(res.data.data);
          setDatabase_googleApi(res.data.data.googleApi);
          if (res.data.data.googleApi) setGoogleApi(res.data.data.googleApi);
          else setGoogleApi('');
          setDatabase_url(res.data.data.googleSheet);
          if (res.data.data.googleSheet) setUrl(res.data.data.googleSheet);
          else setUrl('');
        })
        .catch((err) => {
          console.log('Error:', err);
        });
    }
  }, [props.set_connection_company]);

  const setCompany = () => {
    let company = null;
    if (localStorage.getItem('roleId') < 3 && props.set_connection_company)
      company = props.set_connection_company.value;
    if (localStorage.getItem('roleId') >= 3)
      company = localStorage.getItem('companyId');
    setCompanyId(company);
    return company;
  };

  const updateApi = (type) => {
    console.log('this is reducer', props.set_connection_company);
    if (googleApi || type === 'remove') {
      if (companyId) {
        if (type === 'add')
          var data = {
            companyId: companyId,
            googleApi: googleApi
          };
        else if (type === 'remove')
          var data = {
            companyId: companyId,
            googleApi: null
          };
        ConnectionsService.updateGoogleApi(data)
          .then((res) => {
            setDatabase_googleApi(res.data.googleApi);
            setGoogleApi(res.data.googleApi ? res.data.googleApi : '');
            alert('successfully updated');
            // console.log(res.data);
          })
          .catch((err) => {
            console.log('Error:', err);
            alert('Failed');
          });
      } else alert('please select company');
    } else {
      alert('please input API');
    }
  };

  const insertGoogleSheet = () => {
    if (googleApi) {
      if (url) {
        setPageLoading(true);
        if (companyId) {
          var data = {
            companyId: companyId,
            googleSheetUrl: url
          };
          ConnectionsService.insertGoogleSheet(data)
            .then((res) => {
              setDatabase_url(res.data.googleSheet);
              setUrl(res.data.googleSheet);
              setPageLoading(false);
              // console.log(res.data);
              alert('successfully inserted');
            })
            .catch((err) => {
              setPageLoading(false);
              console.log('Error:', err);
              alert('Error:', err);
            });
        }
      } else alert('please insert URL');
    } else alert('first insert API');
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
        <div className="panel-name terminology">Google Sheet</div>
      </div>
      {pageLoading ? (
        <div className="panel-body terminology d-flex justify-content-center align-items-center">
          <img className="pb-5 mb-5" src={loadingGif} alt="loader gif" />
        </div>
      ) : (
        <div className="panel-body terminology">
          <div className="input-control" style={{ display: 'grid' }}>
            <label>Google API</label>
            <input
              type="text"
              value={googleApi}
              onChange={(e) => setGoogleApi(e.target.value)}
            />
          </div>

          {database_googleApi ? (
            <div className="d-flex">
              <button
                className="button button--block-admin-connections1 mb-5 button-outlined"
                onClick={() => updateApi('remove')}>
                Disconnect
              </button>
              <button
                className="button button--block-admin-connections1 mb-5 button-primary"
                onClick={() => updateApi('add')}>
                Refresh
              </button>
            </div>
          ) : (
            <button
              className="button button--block-admin-connections mb-5 button-primary"
              onClick={() => updateApi('add')}>
              Add
            </button>
          )}

          <div className="input-control" style={{ display: 'grid' }}>
            <label>Google Sheet URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://"
            />
          </div>

          {database_url ? (
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
              onClick={insertGoogleSheet}>
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
