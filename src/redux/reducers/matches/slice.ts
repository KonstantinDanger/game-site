import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { getMatchById, getMatchList, updateMatch, deleteMatch } from './asyncThunks';

import type { Match } from '@/types/matches';
import type { Status } from '@/types/reducer';
import type { Paging } from '@/types/fields';
import type { ChangePaging } from '@/components/Pagination/Pagination';

type State = {
  matchList: Match[];
  match: Match | null;
  pagination: Paging;
  status: Status | 'updating';
};

export const initialState: State = {
  matchList: [],
  match: null,
  pagination: {
    page: 1,
    perPage: 10,
    totalCount: 1,
  },
  status: 'idle',
};

const matchesSlice = createSlice({
  name: 'matches',
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
      .addCase(getMatchList.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        getMatchList.fulfilled,
        (state, action: PayloadAction<{ list: Match[]; totalCount: number }>) => {
          const { list, totalCount } = action.payload;
          state.matchList = list;
          state.pagination.totalCount = totalCount;
          state.status = 'loaded';
        },
      )
      .addCase(getMatchList.rejected, state => {
        state.status = 'error';
      })
      .addCase(getMatchById.pending, state => {
        state.status = 'loading';
      })
      .addCase(getMatchById.fulfilled, (state, action: PayloadAction<Match>) => {
        state.status = 'loaded';
        state.match = action.payload;
      })
      .addCase(getMatchById.rejected, state => {
        state.status = 'error';
      })
      .addCase(updateMatch.pending, state => {
        state.status = 'updating';
      })
      .addCase(updateMatch.fulfilled, (state, action: PayloadAction<Match>) => {
        const updatedMatch = action.payload;
        // Update match in list if exists
        const index = state.matchList.findIndex(m => m.id === updatedMatch.id);
        if (index !== -1) {
          state.matchList[index] = updatedMatch;
        }
        // Update current match if it's the same
        if (state.match?.id === updatedMatch.id) {
          state.match = updatedMatch;
        }
        state.status = 'loaded';
      })
      .addCase(updateMatch.rejected, state => {
        state.status = 'error';
      })
      .addCase(deleteMatch.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteMatch.fulfilled, state => {
        // List will be refreshed by the thunk
        state.status = 'loaded';
      })
      .addCase(deleteMatch.rejected, state => {
        state.status = 'error';
      });
  },
});

export const { setPaging } = matchesSlice.actions;
export default matchesSlice.reducer;
