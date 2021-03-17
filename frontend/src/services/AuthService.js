import axios from 'axios'
import { getInsightBackendAPI } from '../utils/Http';
import { handleErrorResponseObject } from '../utils/Utils';

class AuthService {
    signIn = (data) => {
        const api = getInsightBackendAPI();
        return axios.post(`${api}/auth/signin`, data)
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }
    signUp = (data) => {
        const api = getInsightBackendAPI();
        return axios.post(`${api}/auth/signup`, data)
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }
    createAccount = (data) => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.post(`${api}/admin/users/addNewUser`, data, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }
    logout = () => {
        localStorage.removeItem('access_token');
    }
}

export default (new AuthService());