export interface TournamentStatsResponse {
  updatedAt: Date;
  players: Player[];
  ranking: Player[];
  mvp: Player;
  fromCache: boolean;
}

export interface Player {
  position?: number;
  nickname: string;
  role: string;
  tier: string;
  rank: string;
  lp: number;
  wins: number;
  losses: number;
  totalGames: number;
  winrate: number;
  tournamentPoints: number;
}
