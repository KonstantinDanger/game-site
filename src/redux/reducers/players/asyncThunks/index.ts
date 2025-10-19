import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import qs from 'qs';

import api, { setAuthToken } from '@/api';
import { sleep } from '@/utils';

export const getPlayer = createAsyncThunk('players/getPlayer', async (id: string) => {
  try {
    await sleep(1000); // imitate min query time
    const response = await api.post(`api/players/${id}`, id);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error: any) {
    toast.error(`Failed to get player. ${error.message}`);
    throw new Error(error.message);
  }
});

export const getPlayerList = createAsyncThunk(
  'players/getPlayerList',
  async (_, { getState }: any) => {
    try {
      const { pagination } = getState().players;
      await sleep(1000); // imitate min query time
      const response = await api.post(`api/players/${qs.stringify(pagination)}`);
      setAuthToken(response.data);
      return response.data;
    } catch (error: any) {
      toast.error(`Failed to get player list. ${error.message}`);
      throw new Error(error.message);
    }
  },
);
