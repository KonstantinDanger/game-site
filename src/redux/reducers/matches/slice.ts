import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { getMatchById, getMatchList } from './asyncThunks';

import type { Match } from '@/types/matches';
import type { Status } from '@/types/reducer';
import type { Paging } from '@/types/fields';
import type { ChangePaging } from '@/components/Pagination/Pagination';

type State = {
  matchList: Match[];
  match: Match | null;
  pagination: Paging;
  status: Status;
};

type GetMatchListResponse = {
  list: Match[];
  total: number;
};

export const initialState: State = {
  matchList: [],
  match: null,
  pagination: {
    page: 1,
    perPage: 10,
    totalPages: 1,
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
        (state, action: PayloadAction<GetMatchListResponse>) => {
          const { list, total } = action.payload;
          state.matchList = list;
          state.pagination.totalPages = total;
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
      });
  },
});

export const { setPaging } = matchesSlice.actions;
export default matchesSlice.reducer;
