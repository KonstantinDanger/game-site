import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import qs from 'qs';

import api from '@/api';
import { getErrorMessage } from '@/utils';
import type { PlayerUpdateData } from '@/types/players';

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
      const response = await api.get(`api/players?${qs.stringify(pagination)}`);
      return response.data.data;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Player list loading failed: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  },
);

export const updatePlayer = createAsyncThunk(
  'players/updatePlayer',
  async ({ id, data }: { id: string; data: PlayerUpdateData }) => {
    try {
      const response = await api.patch(`api/players/${id}`, data);
      toast.success('Player updated successfully');
      return response.data.data;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Player update failed: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  },
);

export const deletePlayer = createAsyncThunk(
  'players/deletePlayer',
  async (id: string, { dispatch }) => {
    try {
      await api.delete(`api/players/${id}`);
      toast.success('Player deleted successfully');
      dispatch(getPlayerList());
      return id;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Player deletion failed: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  },
);
