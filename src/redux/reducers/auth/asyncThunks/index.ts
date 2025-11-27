import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { removeAuthToken, setAuthToken } from '@/api';
import toast from 'react-hot-toast';

import { getErrorMessage } from '@/utils';

import type { LoginUser, RegisterUser, UpdateUser } from '@/types/users';
import type { ThunkArgs } from '@/types/reducer';

export const logout = createAsyncThunk('/auth/logout', async () => {
  try {
    await api.post('api/auth/logout');
    removeAuthToken();
  } catch (error: any) {
    const errorMessage = getErrorMessage(error);
    toast.error(`Logout failed: ${errorMessage}`);
    removeAuthToken(); // Удаляем токен даже при ошибке
    throw new Error(errorMessage);
  }
});

export const login = createAsyncThunk(
  'auth/login',
  async ({ data, onSuccess, onError }: { data: LoginUser } & ThunkArgs) => {
    try {
      const response = await api.post('api/auth/login', data);

      const accessToken = response.data.data?.accessToken;
      if (accessToken) {
        setAuthToken(accessToken);
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
    if (accessToken) {
      setAuthToken(accessToken);
    }

    return response.data;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error);
    toast.error(`Token refresh failed: ${errorMessage}`);
    throw new Error(errorMessage);
  }
});

export const register = createAsyncThunk('auth/register', async (data: RegisterUser) => {
  try {
    const response = await api.post('api/auth/register', data);

    const accessToken = response.data.data?.accessToken;
    if (accessToken) {
      setAuthToken(accessToken);
    }

    return response.data.data;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error);
    toast.error(`Registration failed: ${errorMessage}`);
    throw new Error(errorMessage);
  }
});

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
      const response = await api.put(`api/auth/player`, data);
      onSuccess?.();
      toast.success('Profile updated successfully');
      return response.data;
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
    return response.data.data;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error);
    if (!errorMessage.includes('401'))
      toast.error(`User loading failed: ${errorMessage}`);
    throw new Error(errorMessage);
  }
});
