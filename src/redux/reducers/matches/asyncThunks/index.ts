import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import qs from 'qs';

import api from '@/api';
import { sleep, getErrorMessage } from '@/utils';
import type { MatchUpdateData } from '@/types/matches';

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

export const updateMatch = createAsyncThunk(
  'matches/updateMatch',
  async ({ id, data }: { id: string; data: MatchUpdateData }) => {
    try {
      const response = await api.patch(`api/matches/${id}`, data);
      toast.success('Match updated successfully');
      return response.data.data;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Match update failed: ${errorMessage}`);
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
