import axios from 'axios';
import { getInsightBackendAPI, parseGetParams } from 'utils/Http';
import { handleErrorResponseObject } from '../utils/Utils';

class RevenueService {

    create = (body) => {
        return getInsightBackendAPI().post(`/revenues`, body).then(res => res.data)
    }

    get = (filter, offset, limit, sort) => {
        return getInsightBackendAPI().get(`/revenues${parseGetParams(filter, offset, limit, sort)}`).then(res => res.data)
    }

    delete = (alertId) => {
        return getInsightBackendAPI().delete(`/revenues/${alertId}`).then(res => res.data)
    }

    getContractCard = () => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.get(`${api}/revenue/contracts/card`, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }

    getContractTable = (page, pageSize, companyName) => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.get(`${api}/revenue/contracts/getContractData/` + page + `/` + pageSize + `/` + companyName, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }

    getExpiringTable = (page, pageSize, companyName) => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.get(`${api}/revenue/contracts/getExpiringTable/` + page + `/` + pageSize + `/` + companyName, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }

    getContractWaterfallData = (page, pageSize, companyName, segment=null, topXX=null, period=null ) => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.get(`${api}/revenue/contracts/getWaterfallData/` + page + `/` + pageSize + `/` + companyName + `/` + segment + `/` + topXX + `/` + period, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }

    getExpiringChart = (companyName) => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.get(`${api}/revenue/contracts/expiringChart/` + companyName, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }

    getRevenueLossExposure = (companyName) => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.get(`${api}/revenue/contracts/revenueLossExposure/` + companyName, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }

    getRevenueCompanies = () => {
        const api = getInsightBackendAPI();
        const token = window.localStorage.getItem('access_token');
        return axios.get(`${api}/revenue/contracts/getDropdownList`, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => res.data)
            .catch(error => handleErrorResponseObject(error));
    }

}
export default (new RevenueService());
