import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import qs from 'qs';

import api from '@/api';
import { getErrorMessage } from '@/utils';

export const getMatchById = createAsyncThunk(
  'matches/getMatchById',
  async (id: string) => {
    try {
      const response = await api.get(`api/matches/${id}`);
      return response.data.data;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Match loading failed: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  },
);

export const getMatchList = createAsyncThunk(
  'matches/getMatchList',
  async (_, { getState }: any) => {
    try {
      const { pagination } = getState().matches;
      const response = await api.get(`api/matches?${qs.stringify(pagination)}`);
      
      console.log('==============================');
      console.log('response.data.data', response.data.data);
      console.log('==============================');

      return response.data.data;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Match list loading failed: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  },
);

export const deleteMatch = createAsyncThunk(
  'matches/deleteMatch',
  async (id: string, { dispatch }) => {
    try {
      await api.delete(`api/matches/${id}`);
      toast.success('Match deleted successfully');
      dispatch(getMatchList());
      return id;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Match deletion failed: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  },
);
