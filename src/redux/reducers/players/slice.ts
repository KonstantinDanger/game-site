import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { getPlayerById, getPlayerList } from './asyncThunks';

import type { Player } from '@/types/players';
import type { Status } from '@/types/reducer';
import type { Paging } from '@/types/fields';
import type { ChangePaging } from '@/components/Pagination/Pagination';

type State = {
  playerList: Player[];
  player: Player | null;
  pagination: Paging;
  status: Status;
};

export const initialState: State = {
  playerList: [],
  player: null,
  pagination: {
    page: 1,
    perPage: 10,
    totalPages: 1,
  },
  status: 'idle',
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPaging: (state, action: PayloadAction<ChangePaging>) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPlayerList.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        getPlayerList.fulfilled,
        (state, action: PayloadAction<{ list: Player[]; totalPages: number }>) => {
          const { list, totalPages } = action.payload;
          state.playerList = list;
          state.pagination.totalPages = totalPages;
          state.status = 'loaded';
        },
      )
      .addCase(getPlayerList.rejected, state => {
        state.status = 'error';
      })
      .addCase(getPlayerById.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPlayerById.fulfilled, (state, action: PayloadAction<Player>) => {
        state.status = 'loaded';
        state.player = action.payload;
      })
      .addCase(getPlayerById.rejected, state => {
        state.status = 'error';
      });
  },
});

export const { setPaging } = playersSlice.actions;
export default playersSlice.reducer;
