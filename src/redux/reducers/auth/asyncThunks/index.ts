import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { removeAuthToken, setAuthToken, setRefreshToken, setSessionId } from '@/api';
import toast from 'react-hot-toast';

import { getErrorMessage } from '@/utils';

import type { LoginUser, RegisterUserData, UpdateUser } from '@/types/users';
import type { ThunkArgs } from '@/types/reducer';

export const logout = createAsyncThunk(
  '/auth/logout',
  async ({ onSuccess, onError }: ThunkArgs) => {
    try {
      await api.post('api/auth/logout');
      removeAuthToken();
      onSuccess?.();
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Logout failed: ${errorMessage}`);
      removeAuthToken();
      onError?.();
      throw new Error(errorMessage);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ data, onSuccess, onError }: { data: LoginUser } & ThunkArgs) => {
    try {
      const response = await api.post('api/auth/login', data);

      const accessToken = response.data.data?.accessToken;
      const refreshToken = response.data.data?.refreshToken;
      const sessionId = response.data.data?.sessionId;

      if (accessToken) {
        setAuthToken(accessToken);
      }
      if (refreshToken) {
        setRefreshToken(refreshToken);
      }
      if (sessionId) {
        setSessionId(sessionId);
      }

      onSuccess?.();
      return response.data.data;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Login failed: ${errorMessage}`);
      onError?.();
      throw new Error(errorMessage);
    }
  },
);

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  try {
    const response = await api.post('api/auth/refresh');

    const accessToken = response.data.data?.accessToken;
    const refreshToken = response.data.data?.refreshToken;
    const sessionId = response.data.data?.sessionId;

    if (accessToken) {
      setAuthToken(accessToken);
    }
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
    if (sessionId) {
      setSessionId(sessionId);
    }

    return response.data;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error);
    toast.error(`Token refresh failed: ${errorMessage}`);
    throw new Error(errorMessage);
  }
});

export const register = createAsyncThunk(
  'auth/register',
  async ({ data, onSuccess, onError }: { data: RegisterUserData } & ThunkArgs) => {
    try {
      const response = await api.post('api/auth/register', data);

      const accessToken = response.data.data?.accessToken;
      const refreshToken = response.data.data?.refreshToken;
      const sessionId = response.data.data?.sessionId;

      if (accessToken) {
        setAuthToken(accessToken);
      }
      if (refreshToken) {
        setRefreshToken(refreshToken);
      }
      if (sessionId) {
        setSessionId(sessionId);
      }

      onSuccess?.(response.data.data);
      return response.data.data;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Registration failed: ${errorMessage}`);
      onError?.();
      throw new Error(errorMessage);
    }
  },
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({
    data: { password, ...data },
    onSuccess,
    onError,
  }: { data: UpdateUser } & ThunkArgs) => {
    try {
      const body: UpdateUser = { ...data };
      if (password) body.password = password;
      const response = await api.put(`api/auth/player`, body);
      onSuccess?.(response.data.data);
      toast.success('Profile updated successfully');
      return response.data.data;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Profile update failed: ${errorMessage}`);
      onError?.();
      throw new Error(errorMessage);
    }
  },
);

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async () => {
  try {
    const response = await api.get('api/auth/current-user');
    const accessToken = response.data?.accessToken;
    const refreshToken = response.data?.refreshToken;
    const sessionId = response.data?.sessionId;

    if (accessToken) {
      setAuthToken(accessToken);
    }
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
    if (sessionId) {
      setSessionId(sessionId);
    }

    return response.data.data;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error);
    if (!errorMessage.includes('401'))
      toast.error(`User loading failed: ${errorMessage}`);
    throw new Error(errorMessage);
  }
});
