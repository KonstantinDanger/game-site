import type { Match } from './matches';

export type Player = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  playedMatchesCount?: number;
  matches?: Match[];
  totalMatchTime?: number;
};

export type PlayerUpdateData = {
  name: string;
};
