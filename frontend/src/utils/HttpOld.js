// import Auth from "utils/Auth";
import Log from "utils/Log";
import config from "config";

class Http {
  constructor() {
    // private methods for HTTP library
    this.methods = {};

    // create api url before sent the request
    this.methods.getURL = (url, params) => {
      let URL = ((url || "").includes("http")) ? url : `${config.API_URL}${url}`;
      if (Object.keys((params || {})).length > 0) {
        URL = `${URL}?`;
        for (let key in params) {
          URL = `${URL}${key}=${encodeURIComponent(params[key])}`;
        }
      }
      return URL;
    };
    
    // stringify data before sent
    this.methods.getBody = (body) => JSON.stringify((body || {}));

    // Set request headers every time
    this.methods.getHeaders = (headers) => {
      let defaultHeaders = new Headers({
        'Content-Type': 'application/json'
      });
      for (let key in (headers || {})) {
        defaultHeaders.set(key, headers[key]);
      }
      return defaultHeaders;
    };

    // Handle all http requests
    this.methods.request = async (type, url, body, queryParams, headers) => {
      type = type.toUpperCase();
      let URL = this.methods.getURL(url, queryParams);
      let params = {};
      params.method = type;
      params.headers = this.methods.getHeaders(headers);
      if (["POST", "PUT", "PATCH"].indexOf(type) >= 0) {
        params.body = this.methods.getBody(body);
      }
      Log.trace(`${type}: ${URL}`);
      return fetch(URL, params);
    };
  }

  get = async (url, queryParams, headers) => {
    return this.methods.request("GET", url, {}, queryParams, headers);
  }

  post = async (url, body, headers, queryParams) => {
    return this.methods.request("POST", url, body, queryParams, headers);
  }

  put = async (url, body, headers, queryParams) => {
    return this.methods.request("PUT", url, body, queryParams, headers);
  }

  patch = async (url, body, headers, queryParams) => {
    return this.methods.request("PATCH", url, body, queryParams, headers);
  }

  delete = async (url, queryParams, headers) => {
    return this.methods.request("DELETE", url, {}, queryParams, headers);
  }
}

export default (new Http());
