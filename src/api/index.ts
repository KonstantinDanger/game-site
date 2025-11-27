import axios from 'axios';

const isDev = window.location.origin.includes('localhost');
const prefix = isDev ? 'DEV' : 'PROD';
export const baseURL = import.meta.env[`VITE_API_ORIGIN_${prefix}`];

export const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const api = axios.create({
  baseURL,
  headers,
  responseType: 'json',
  withCredentials: true,
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  delete api.defaults.headers.common.Authorization;
};

export default api;
