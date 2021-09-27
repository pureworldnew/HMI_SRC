import axios from 'axios';
import Config from 'config';
import { getInsightBackendAPI } from '../utils/Http';
import { handleErrorResponseObject } from '../utils/Utils';

class AdminService {
  setLimitVoltage = (lowLimitVol, cautionLimitVol) => {
    const token = window.localStorage.getItem('access_token');
    const insightBackendAPI = axios.create({
      baseURL:
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
          ? `http://localhost:5000`
          : `${Config.API_URL}`,
      headers: {
        Authorization: `Bearer ${token}`,
        // 'x-access-token': `${window.localStorage.getItem('access_token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return insightBackendAPI
      .post('/backoffice/settings/limit', {
        lowLimitVol: lowLimitVol,
        cautionLimitVol: cautionLimitVol
      })
      .then((res) => res.data)
      .catch((error) => handleErrorResponseObject(error));
  };
  getLimitVal = () => {
    const api = getInsightBackendAPI();
    const token = window.localStorage.getItem('access_token');
    return axios
      .get(`${api}/backoffice/settings/limit`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => res.data)
      .catch((error) => handleErrorResponseObject(error));
  };
  getLogUrl = () => {
    const api = getInsightBackendAPI();
    const token = window.localStorage.getItem('access_token');
    return axios
      .get(`${api}/backoffice/connections/logUrl/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => res.data)
      .catch((error) => handleErrorResponseObject(error));
  };
  checkLogData = () => {
    const api = getInsightBackendAPI();
    const token = window.localStorage.getItem('access_token');
    return axios
      .get(`${api}/backoffice/connections/checkLogTable`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => res.data)
      .catch((error) => handleErrorResponseObject(error));
  };
  removeLogUrl = (url) => {
    const api = getInsightBackendAPI();
    const token = window.localStorage.getItem('access_token');
    return axios
      .delete(`${api}/backoffice/connections/logUrl`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { logUrl: url }
      })
      .then((res) => {
        console.log('res is here', res);
      })
      .catch((error) => handleErrorResponseObject(error));
  };
  addLogUrl = (url) => {
    const token = window.localStorage.getItem('access_token');
    const insightBackendAPI = axios.create({
      baseURL:
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
          ? `http://localhost:5000`
          : `${Config.API_URL}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return insightBackendAPI
      .post('/backoffice/connections/logUrl/', {
        logUrl: url
      })
      .then((res) => res.data)
      .catch((error) => handleErrorResponseObject(error));
  };
  insertLogData = (url) => {
    const token = window.localStorage.getItem('access_token');
    const insightBackendAPI = axios.create({
      baseURL:
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
          ? `http://localhost:5000`
          : `${Config.API_URL}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return insightBackendAPI
      .post('/backoffice/connections/logData/', {
        logUrl: url
      })
      .then((res) => res.data)
      .catch((error) => handleErrorResponseObject(error));
  };
  removeLogData = () => {
    const api = getInsightBackendAPI();
    const token = window.localStorage.getItem('access_token');
    return axios
      .delete(`${api}/backoffice/connections/logData/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {})
      .catch((error) => handleErrorResponseObject(error));
  };
}
export default new AdminService();
