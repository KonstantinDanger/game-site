import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api';
import toast from 'react-hot-toast';
import type { LoginUser, RegisterUser, UpdateUser } from '@/types/users';

export const logout = createAsyncThunk('/auth/logout', async () => {
  try {
    await api.post('api/auth/logout');
  } catch (error: any) {
    toast.error(`Failed to logout. ${error.message}`);
    throw new Error(error.message);
  }
});

export const login = createAsyncThunk('auth/login', async (data: LoginUser) => {
  try {
    const response = await api.post('api/auth/login', data);

    return response.data;
  } catch (error: any) {
    toast.error(`Failed to log in. ${error.message}`);
    throw new Error(error.message);
  }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  try {
    const response = await api.post('api/auth/refresh');

    return response.data.token;
  } catch (error: any) {
    toast.error(`Failed to refresh token. ${error.message}`);
    throw new Error(error.message);
  }
});

export const register = createAsyncThunk('auth/register', async (data: RegisterUser) => {
  try {
    const response = await api.post('api/auth/register', data);

    return response.data;
  } catch (error: any) {
    toast.error(`Failed to register. ${error.message}`);
    throw new Error(error.message);
  }
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data: UpdateUser) => {
    try {
      const response = await api.put(`api/auth/player`, data);
      return response.data;
    } catch (error: any) {
      toast.error(`Failed to update profile. ${error.message}`);
      throw new Error(error.message);
    }
  },
);

export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const response = await api.get('api/auth/current-user');
    return response.data.player;
  } catch (error: any) {
    throw new Error(error.message);
  }
});
