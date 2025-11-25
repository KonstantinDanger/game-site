import axios from 'axios';

const isDev = window.location.origin.includes('localhost');
const prefix = isDev ? 'DEV' : 'PROD';
export const baseURL = import.meta.env[`VITE_API_ORIGIN_${prefix}`];

export const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': isDev ? 'http://localhost:3000' : '*',
};

const api = axios.create({
  baseURL,
  headers,
  responseType: 'json',
  withCredentials: true,
});

export default api;
