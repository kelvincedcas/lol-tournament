export interface TournamentStatsResponse {
  updatedAt: Date;
  tierA: Tier;
  tierB: Tier;
  fromCache: boolean;
}

export interface Player {
  position?: number;
  nickname: string;
  tag: string;
  role: string;
  group: string;
  strikes: number;
  disqualified: boolean;
  stream?: string;
  tier: string;
  rank: string;
  lp: number;
  wins: number;
  losses: number;
  totalGames: number;
  winrate: number;
  tournamentPoints: number;
}

export interface Tier {
  players: Player[];
  ranking: Player[];
  mvp: Player;
}

export type Group = 'A' | 'B';

export type Rank = 'I' | 'II' | 'III' | 'IV';

export type Role = 'ADC' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT';

export type TierEnum =
  | 'BRONZE'
  | 'EMERALD'
  | 'GOLD'
  | 'PLATINUM'
  | 'SILVER'
  | 'UNRANKED';
