import axios from 'axios';
import Config from 'config';
import { getInsightBackendAPI } from '../utils/Http';
import { handleErrorResponseObject } from '../utils/Utils';

class SensorService {
  getAllSensors = () => {
    const api = getInsightBackendAPI();
    const token = window.localStorage.getItem('access_token');
    return axios
      .get(`${api}/admin/sensors/getSensorList`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => res.data)
      .catch((error) => handleErrorResponseObject(error));
  };

  getCompanyUsers = (companyId) => {
    const api = getInsightBackendAPI();
    const token = window.localStorage.getItem('access_token');
    return axios
      .get(`${api}/admin/companys/getCompanyById/` + companyId, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => res)
      .catch((error) => handleErrorResponseObject(error));
  };

  createSensor = (
    currentTeamNameVal,
    currentResultMembers,
    currentMemberRoles
  ) => {
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
      .post('/admin/companys/companyCreate', {
        companyName: currentTeamNameVal,
        companyMember: currentResultMembers,
        MemberRoles: currentMemberRoles
      })
      .then((res) => res.data)
      .catch((error) => handleErrorResponseObject(error));
  };

  updateCompany = (companyId, currentResultMembers, selectedRoleOptions) => {
    // console.log("I am in service now", currentResultMembers);
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
      .post('/admin/companys/companyUpdate', {
        companyId: companyId,
        companyMember: currentResultMembers,
        MemberRoles: selectedRoleOptions
      })
      .then((res) => res.data)
      .catch((error) => handleErrorResponseObject(error));
  };
}

export default new SensorService();
