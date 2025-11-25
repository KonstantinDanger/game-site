import { getMe, login, logout, refreshToken, register, updateUser } from './asyncThunks';
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Status } from '@/types/reducer';
import type { Player } from '@/types/players';

type SliceState = {
  player: Player;
  token: string;
  status: Status | 'refreshing' | 'updating';
};

type LoginPayload = {
  player: Player;
  token: string;
};

// Восстановление токена из localStorage при инициализации
const getInitialToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token') || '';
  }
  return '';
};

const initialState: SliceState = {
  player: {
    id: '',
    name: '',
    email: '',
  },
  token: getInitialToken(),
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<LoginPayload>) => {
        state.player = action.payload.player;
        state.token = action.payload.token;
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
        state.token = action.payload.token;
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
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
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

      .addCase(getMe.pending, state => {
        state.status = 'loading';
      })
      .addCase(getMe.fulfilled, (state, action: PayloadAction<Player>) => {
        state.player = action.payload;
        state.status = 'loaded';
      })
      .addCase(getMe.rejected, state => {
        state.token = '';
        state.status = 'idle';
      });
  },
});

export default authSlice.reducer;
