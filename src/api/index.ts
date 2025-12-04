import axios from 'axios';

import { resetAuth } from '@/redux/reducers/auth';
import { store } from '@/redux/store';

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
});

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  SESSION_ID: 'sessionId',
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

export const getSessionId = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.SESSION_ID);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
};

export const setSessionId = (id: string) => {
  localStorage.setItem(STORAGE_KEYS.SESSION_ID, id);
};

export const setAuthToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
};

export const removeAuthToken = () => {
  delete api.defaults.headers.common.Authorization;
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.SESSION_ID);
};

api.interceptors.request.use(
  config => {
    const refreshToken = getRefreshToken();
    const sessionId = getSessionId();

    if (refreshToken && sessionId) {
      config.headers['X-Refresh-Token'] = refreshToken;
      config.headers['X-Session-Id'] = sessionId;
    }

    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  res => res,
  err => {
    if (import.meta.env.MODE === 'development') {
      console.log(err.response?.status);
    }
    if (err.response?.status === 401) {
      removeAuthToken();
      store.dispatch(resetAuth());
    }
    return Promise.reject(err);
  },
);

export default api;
