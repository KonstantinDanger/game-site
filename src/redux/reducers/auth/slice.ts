import { login, logout, refreshToken, register, updateUser } from './asyncThunks';
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Status } from '@/types/reducer';

type User = {
  name: string;
  email: string;
};

type SliceState = {
  user: User;
  token: string;
  status: Status | 'refreshing' | 'updating';
};

type LoginPayload = {
  user: User;
  token: string;
};

const initialState: SliceState = {
  user: {
    name: '',
    email: '',
  },
  token: '',
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
        state.user = action.payload.user;
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
        state.user = action.payload.user;
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
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = 'loaded';
      })
      .addCase(updateUser.rejected, state => {
        state.status = 'loaded';
      });
  },
});

export default authSlice.reducer;
