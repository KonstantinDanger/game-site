import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { getPlayerById, getPlayerList, updatePlayer, deletePlayer } from './asyncThunks';

import type { Player } from '@/types/players';
import type { Status } from '@/types/reducer';
import type { Paging } from '@/types/fields';
import type { ChangePaging } from '@/components/Pagination/Pagination';
import type { Match } from '@/types/matches';

type PlayerData = {
  player: Player;
  totalMatchTime: number;
  matches: Match[];
};

type State = {
  playerList: Player[];
  playerData: PlayerData | null;
  pagination: Paging;
  status: Status | 'updating';
};

export const initialState: State = {
  playerList: [],
  playerData: null,
  pagination: {
    page: 1,
    perPage: 10,
    totalCount: 1,
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
        (state, action: PayloadAction<{ list: Player[]; totalCount: number }>) => {
          const { list, totalCount } = action.payload;
          state.playerList = list;
          state.pagination.totalCount = totalCount;
          state.status = 'loaded';
        },
      )
      .addCase(getPlayerList.rejected, state => {
        state.status = 'error';
      })
      .addCase(getPlayerById.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPlayerById.fulfilled, (state, action: PayloadAction<PlayerData>) => {
        state.status = 'loaded';
        state.playerData = action.payload;
      })
      .addCase(getPlayerById.rejected, state => {
        state.status = 'error';
      })
      .addCase(updatePlayer.pending, state => {
        state.status = 'updating';
      })
      .addCase(updatePlayer.fulfilled, (state, action: PayloadAction<Player>) => {
        const updatedPlayer = action.payload;
        // Update player in list if exists
        const index = state.playerList.findIndex(p => p.id === updatedPlayer.id);
        if (index !== -1) {
          state.playerList[index] = updatedPlayer;
        }
        state.status = 'loaded';
      })
      .addCase(updatePlayer.rejected, state => {
        state.status = 'error';
      })
      .addCase(deletePlayer.pending, state => {
        state.status = 'loading';
      })
      .addCase(deletePlayer.fulfilled, state => {
        // List will be refreshed by the thunk
        state.status = 'loaded';
      })
      .addCase(deletePlayer.rejected, state => {
        state.status = 'error';
      });
  },
});

export const { setPaging } = playersSlice.actions;
export default playersSlice.reducer;
