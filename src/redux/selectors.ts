import type { RootState } from './store';

export const playersSelector = (state: RootState) => state.players;
export const matchesSelector = (state: RootState) => state.matches;
export const authSelector = (state: RootState) => state.auth;
