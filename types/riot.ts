export type RankedEntry = {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
};

export type Role = 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT';

export interface SoloQRanked {
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}
