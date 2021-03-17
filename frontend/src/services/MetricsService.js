import { getInsightBackendAPI } from 'utils/Http';

class MetricsService {
  getMetrics = async (payload) => {
    return getInsightBackendAPI().post(`/metrics`, {metrics:payload}).then(res => res.data);
  }

}
export default (new MetricsService());
