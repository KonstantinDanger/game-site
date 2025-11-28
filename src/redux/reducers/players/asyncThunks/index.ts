import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import qs from 'qs';

import api from '@/api';
import { sleep, getErrorMessage } from '@/utils';

export const getPlayerById = createAsyncThunk(
  'players/getPlayerById',
  async (id: string) => {
    try {
      const response = await api.get(`api/players/${id}`);
      return response.data.data;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Player loading failed: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  },
);

export const getPlayerList = createAsyncThunk(
  'players/getPlayerList',
  async (_, { getState }: any) => {
    try {
      const { pagination } = getState().players;
      await sleep(1000); // imitate min query time
      const response = await api.get(`api/players?${qs.stringify(pagination)}`);
      return response.data.data;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Player list loading failed: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  },
);
