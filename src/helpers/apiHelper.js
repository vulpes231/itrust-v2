import axios from "axios";
import { devUrl, getAccessToken, liveUrl } from "../constants";

// default
axios.defaults.baseURL = liveUrl;

const token = getAccessToken();
if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    let message;

    switch (error.response?.status) {
      case 500:
        message = error.response.data;
        break;
      case 401:
        message = "Invalid credentials";
        sessionStorage.clear();
        window.location.href = "/login";
        break;
      case 403:
        message = error.response.data;
        sessionStorage.clear();
        window.location.href = "/login";
        break;
      case 404:
        message = error.response.data;
        break;
      default:
        message = error.response?.data?.message || error.message || error;
    }
    return Promise.reject(message);
  }
);

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class APIClient {
  /**
   * Fetches data from given url
   */
  get = (url, params, config = {}) => {
    let queryString = "";

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value);
        }
      });
      queryString = searchParams.toString();
    }

    const finalUrl = queryString ? `${url}?${queryString}` : url;
    return axios.get(finalUrl, config);
  };

  /**
   * POST request for JSON data
   */
  create = (url, data, config = {}) => {
    return axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      ...config,
    });
  };

  /**
   * POST request for file upload (multipart/form-data)
   */
  upload = (url, data, config = {}) => {
    const formData = data instanceof FormData ? data : new FormData();
    if (!(data instanceof FormData)) {
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
    }

    return axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...config.headers,
      },
      ...config,
    });
  };

  /**
   * Updates data with PATCH
   */
  update = (url, data, config = {}) => {
    return axios.patch(url, data, config);
  };

  /**
   * Updates data with PUT
   */
  put = (url, data, config = {}) => {
    return axios.put(url, data, config);
  };

  /**
   * Delete
   */
  delete = (url, config = {}) => {
    return axios.delete(url, config);
  };
}

const getLoggedinUser = () => {
  const user = sessionStorage.getItem("user");
  return user;
};

export { APIClient, setAuthorization, getLoggedinUser };
