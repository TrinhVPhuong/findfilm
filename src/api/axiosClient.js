// Cài đặt axiosClient 

import axios from "axios";
import queryString from 'query-string';
import apiConfig from "./apiConfig.js";

//khởi tạo axiosClient
const axiosClient = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: params => queryString.stringify({...params, api_key: apiConfig.apiKey}),
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

// lấy giá trị response
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
export default axiosClient;
