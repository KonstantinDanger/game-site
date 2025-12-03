import type { Player } from './players';

export type Match = {
  id: string;
  matchTime: number;
  matchDate: Date;
  winner?: Player;
  loser?: Player;
};
