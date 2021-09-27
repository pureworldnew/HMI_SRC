import axios from 'axios';
import { getInsightBackendAPI } from '../utils/Http';
import { handleErrorResponseObject } from '../utils/Utils';

class ConnectionsService {
    updateGoogleApi = (data) => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.post(`${api}/admin/connections/updateApi`, data, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }

    insertGoogleSheet = (data) => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.post(`${api}/admin/connections/insertGoogleSheet`, data, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }

    removeGoogleSheet = (companyId) => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.get(`${api}/admin/connections/removeGoogleSheet/`+companyId, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }

    updateGoogleSheet = (data) => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.post(`${api}/admin/connections/updateGoogleSheet`, data, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }
}
export default (new ConnectionsService());
