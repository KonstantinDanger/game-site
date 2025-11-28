import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import qs from 'qs';

import api from '@/api';
import { sleep, getErrorMessage } from '@/utils';

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
      await sleep(1000); // imitate min query time
      const response = await api.get(`api/matches?${qs.stringify(pagination)}`);
      return response.data.data;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Match list loading failed: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  },
);
