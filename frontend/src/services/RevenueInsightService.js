import axios from 'axios';
import { getInsightBackendAPI, parseGetParams } from 'utils/Http';
import { handleErrorResponseObject } from '../utils/Utils';

class RevenueInsightService {

    getSegmentData = () => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.get(`${api}/revenue/contracts/getSegmentData/null`, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }

    getSummaryData = (date, period) => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.get(`${api}/revenue/revenueInsights/summary/getCountOfCustomers/${date}/${period}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }

    getCardData = () => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.get(`${api}/revenue/revenueInsights/card`, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }

}
export default (new RevenueInsightService());