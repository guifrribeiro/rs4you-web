import axios from 'axios';

const baseUrl = 'http://localhost:8080';

const config = {
  withCredentials: false,
  baseUrl: baseUrl,
  crossdomain: true,
  headers: { 'Content-Type': 'application/json' },
  maxBodyLength: 50000000,
  maxContentLength: 50000000,
};

const axiosInstance = axios.create(config);

export { axiosInstance as axios };