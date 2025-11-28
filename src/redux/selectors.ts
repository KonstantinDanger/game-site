import type { RootState } from './store';

export const playersSelector = (state: RootState) => state.players;
export const matchesSelector = (state: RootState) => state.matches;
export const authSelector = (state: RootState) => state.auth;
<<<<<<< HEAD
export const userSelector = (state: RootState) => state.auth.user;
=======
>>>>>>> fa4cd58 (TS linter errors fix)
