import axios from 'axios';
import { getInsightBackendAPI } from '../utils/Http';
import { handleErrorResponseObject } from '../utils/Utils';


const api = getInsightBackendAPI();


class AccountService {

    getAccountManagers = (page, pageSize) => {
    	const token = window.localStorage.getItem('access_token');
        const companyId = window.localStorage.getItem('companyId');
        return axios.get(`${api}/account/managers/${companyId}`, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                return res.data;
            })
            .catch(error => handleErrorResponseObject(error));
    };

    getEventsWeeklyData = async (timeBase, companyId, handleTableDataChange) => {
        try{
            const token = window.localStorage.getItem('access_token');
            const result = await axios.get(`${api}/account/events_weeklies/` + timeBase + '/' + companyId, {headers: {"Authorization" : `Bearer ${token}`}});
            return handleTableDataChange(result.data);
        }catch(error) {
            console.log(error);
            // return {error: error.response}
        }
    }

    getEventsWeeklyBarChartsData =  async (timeBase, companyId, handleTableDataChange) => {
        try{
            const token = window.localStorage.getItem('access_token');
            const result = await axios.get(`${api}/account/events_weeklies_barcharts/` + timeBase + '/' + companyId, {headers: {"Authorization" : `Bearer ${token}`}});
            return handleTableDataChange(result.data);
        }catch(error) {
            console.log(error);
            // return {error: error.response}
        }
    }

}
export default (new AccountService());
