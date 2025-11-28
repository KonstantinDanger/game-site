import {
  getCurrentUser,
  login,
  logout,
  refreshToken,
  register,
  updateUser,
} from './asyncThunks';
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Status } from '@/types/reducer';
import type { Player } from '@/types/players';

type SliceState = {
  player: Player | null;
  status: Status | 'refreshing' | 'updating';
};

type LoginPayload = {
  player: Player;
};

const initialState: SliceState = {
  player: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<LoginPayload>) => {
        state.player = action.payload.player;
        state.status = 'loaded';
      })
      .addCase(register.rejected, state => {
        state.status = 'loaded';
      })

      .addCase(login.pending, state => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginPayload>) => {
        state.player = action.payload.player;
        state.status = 'loaded';
      })
      .addCase(login.rejected, state => {
        state.status = 'idle';
      })

      .addCase(logout.pending, state => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, state => {
        state.status = 'loaded';
      })

      .addCase(refreshToken.pending, state => {
        state.status = 'refreshing';
      })
      .addCase(refreshToken.fulfilled, state => {
        state.status = 'loaded';
      })
      .addCase(refreshToken.rejected, () => initialState)
      .addCase(updateUser.pending, state => {
        state.status = 'updating';
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<Player>) => {
        state.player = action.payload;
        state.status = 'loaded';
      })
      .addCase(updateUser.rejected, state => {
        state.status = 'loaded';
      })

      .addCase(getCurrentUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<Player>) => {
        state.player = action.payload;
        state.status = 'loaded';
      })
      .addCase(getCurrentUser.rejected, state => {
        state.status = 'idle';
      });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
