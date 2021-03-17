import axios from 'axios'
import { getInsightBackendAPI } from '../utils/Http';
import { handleErrorResponseObject } from '../utils/Utils';

class UserService {
    getUsersList = () => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.get(`${api}/admin/users/getUsersList`, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }
    getAllUserList = () => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.get(`${api}/admin/companys/getAllUserList`, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }
    getRoleList = () => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.get(`${api}/admin/users/getRoleList`, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }
}

export default (new UserService());