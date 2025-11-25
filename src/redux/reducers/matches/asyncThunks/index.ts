import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import qs from 'qs';

import api from '@/api';
import { sleep } from '@/utils';

export const getMatchById = createAsyncThunk(
  'matches/getMatchById',
  async (id: string) => {
    try {
      const response = await api.get(`api/match/${id}`);
      return response.data;
    } catch (error: any) {
      toast.error(`Failed to get match. ${error.message}`);
      throw new Error(error.message);
    }
  },
);

export const getMatchList = createAsyncThunk(
  'matches/getMatchList',
  async (_, { getState }: any) => {
    try {
      const { pagination } = getState().matches;
      await sleep(1000); // imitate min query time
      const response = await api.post(`api/matches/${qs.stringify(pagination)}`);
      return response.data;
    } catch (error: any) {
      toast.error(`Failed to get match list. ${error.message}`);
      throw new Error(error.message);
    }
  },
);
