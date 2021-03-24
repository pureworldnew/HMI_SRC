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
          ? `http://localhost:8000`
          : `${Config.API_URL}`,
      headers: {
        Authorization: `Bearer ${token}`,
        // 'x-access-token': `${window.localStorage.getItem('access_token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return insightBackendAPI
      .post('/admin/settings/limitSet', {
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
      .get(`${api}/admin/settings/getLimit`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => res.data)
      .catch((error) => handleErrorResponseObject(error));
  };
  getLogUrl = () => {
    const api = getInsightBackendAPI();
    const token = window.localStorage.getItem('access_token');
    return axios
      .get(`${api}/admin/settings/getLogUrl`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => res.data)
      .catch((error) => handleErrorResponseObject(error));
  };
}
export default new AdminService();
