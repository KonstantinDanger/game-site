import type { Player } from './players';

export type Match = {
  id: string;
  name: string;
  matchTime: number;
  matchDate: Date;
  winner?: Player;
  loser?: Player;
};

export type MatchUpdateData = {
  name: string;
};
