import axios from 'axios';
import { getInsightBackendAPI } from '../utils/Http';
import { handleErrorResponseObject } from '../utils/Utils';

class NotificationService {
  createNotification = (body) => {
    const api = getInsightBackendAPI();
    const token = window.localStorage.getItem('access_token');
    return axios
      .post(`${api}/notifications`, body, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => res.data)
      .catch((error) => handleErrorResponseObject(error));
  };
}

export default new NotificationService();
