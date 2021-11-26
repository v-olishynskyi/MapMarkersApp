import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  // baseURL: 'http://54.93.249.32:3000/api',
});
