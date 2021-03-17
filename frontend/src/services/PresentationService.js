import axios from 'axios'
import { getInsightBackendAPI } from '../utils/Http';
import { handleErrorResponseObject } from '../utils/Utils';


const api = getInsightBackendAPI();

class PresentationService {
    getPresentations = () => {
        const token = window.localStorage.getItem('access_token');
        return axios.get(`${api}/presentations`, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                let { data } = res;
                return data.data;
            })
            .catch(error => handleErrorResponseObject(error));
    }
}
export default (new PresentationService());
