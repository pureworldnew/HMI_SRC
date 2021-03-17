import { getInsightBackendAPI, parseGetParams } from '../utils/Http';

class ProductService {

  getAll = (filter, offset, limit, sort) => {
    return getInsightBackendAPI().get(`/products${parseGetParams(filter, offset, limit, sort)}`)
      .then(response => response.data);
  }

  create = (payload) => {
    return getInsightBackendAPI().post('/products', payload);
  }

  get = (id) => {
    return getInsightBackendAPI().get(`/products/${id}`)
      .then(response => response.data);
  }
  
}
export default (new ProductService());
