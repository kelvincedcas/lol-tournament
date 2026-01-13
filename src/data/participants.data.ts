export type Role = 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT';

export type Rank =
  | 'IRON'
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'PLATINUM'
  | 'EMERALD'
  | 'DIAMOND'
  | 'MASTER'
  | 'GRANDMASTER'
  | 'CHALLENGER';

export type Division = 'IV' | 'III' | 'II' | 'I';

export interface Participant {
  summonerName: string;
  rank: Rank;
  division: Division | null; // Master+ has no division
  lp: number;
  role: Role;
  gamesPlayed: number;
  wins: number;
  losses: number;
  tournamentPoints: number;
}

// Calculate tournament points: 100 points per division from Iron 4
// Iron 4 = 0, Iron 3 = 100, Iron 2 = 200, Iron 1 = 300
// Bronze 4 = 400, etc.
const rankOrder: Rank[] = [
  'IRON',
  'BRONZE',
  'SILVER',
  'GOLD',
  'PLATINUM',
  'EMERALD',
  'DIAMOND',
  'MASTER',
  'GRANDMASTER',
  'CHALLENGER',
];

const divisionOrder: (Division | null)[] = ['IV', 'III', 'II', 'I'];

export const calculateTournamentPoints = (
  rank: Rank,
  division: Division | null,
  lp: number,
): number => {
  const rankIndex = rankOrder.indexOf(rank);
  let points = 0;

  // Each full rank (4 divisions) = 400 points
  // For ranks below Master
  if (rankIndex < 7) {
    // Diamond and below
    points = rankIndex * 400;
    const divIndex = division ? divisionOrder.indexOf(division) : 0;
    points += divIndex * 100;
  } else {
    // Master, Grandmaster, Challenger
    points = 7 * 400; // Diamond 1 = 2800
    if (rank === 'MASTER') points += 100;
    else if (rank === 'GRANDMASTER') points += 200;
    else if (rank === 'CHALLENGER') points += 300;
  }

  // Add LP (scaled down for display)
  points += Math.floor(lp / 10);

  return points;
};

export const getRankColor = (rank: Rank): string => {
  const colors: Record<Rank, string> = {
    IRON: 'text-rank-iron',
    BRONZE: 'text-rank-bronze',
    SILVER: 'text-rank-silver',
    GOLD: 'text-rank-gold',
    PLATINUM: 'text-rank-platinum',
    EMERALD: 'text-rank-emerald',
    DIAMOND: 'text-rank-diamond',
    MASTER: 'text-rank-master',
    GRANDMASTER: 'text-rank-grandmaster',
    CHALLENGER: 'text-rank-challenger',
  };
  return colors[rank];
};

export const getRoleIcon = (role: Role): string => {
  const icons: Record<Role, string> = {
    TOP: '⚔️',
    JUNGLE: '🌲',
    MID: '🎯',
    ADC: '🏹',
    SUPPORT: '🛡️',
  };
  return icons[role];
};
