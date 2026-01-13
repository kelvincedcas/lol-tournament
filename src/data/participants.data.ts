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

export const participants: Participant[] = [
  {
    id: '1',
    summonerName: 'ShadowSlayer',
    rank: 'DIAMOND',
    division: 'II',
    lp: 67,
    role: 'MID',
    gamesPlayed: 342,
    wins: 189,
    losses: 153,
    tournamentPoints: calculateTournamentPoints('Diamond', 'II', 67),
  },
  {
    id: '2',
    summonerName: 'IronWill',
    rank: 'Emerald',
    division: 'I',
    lp: 45,
    role: 'Top',
    gamesPlayed: 256,
    wins: 138,
    losses: 118,
    tournamentPoints: calculateTournamentPoints('Emerald', 'I', 45),
  },
  {
    id: '3',
    summonerName: 'JungleKing',
    rank: 'Platinum',
    division: 'III',
    lp: 89,
    role: 'Jungle',
    gamesPlayed: 198,
    wins: 108,
    losses: 90,
    tournamentPoints: calculateTournamentPoints('Platinum', 'III', 89),
  },
  {
    id: '4',
    summonerName: 'ADCarryMe',
    rank: 'Gold',
    division: 'I',
    lp: 12,
    role: 'ADC',
    gamesPlayed: 412,
    wins: 215,
    losses: 197,
    tournamentPoints: calculateTournamentPoints('Gold', 'I', 12),
  },
  {
    id: '5',
    summonerName: 'HealBot3000',
    rank: 'Emerald',
    division: 'IV',
    lp: 34,
    role: 'Support',
    gamesPlayed: 289,
    wins: 152,
    losses: 137,
    tournamentPoints: calculateTournamentPoints('Emerald', 'IV', 34),
  },
  {
    id: '6',
    summonerName: 'TopDiff',
    rank: 'Silver',
    division: 'II',
    lp: 78,
    role: 'Top',
    gamesPlayed: 156,
    wins: 82,
    losses: 74,
    tournamentPoints: calculateTournamentPoints('Silver', 'II', 78),
  },
  {
    id: '7',
    summonerName: 'MidGap',
    rank: 'Master',
    division: null,
    lp: 156,
    role: 'Mid',
    gamesPlayed: 523,
    wins: 298,
    losses: 225,
    tournamentPoints: calculateTournamentPoints('Master', null, 156),
  },
  {
    id: '8',
    summonerName: 'BronzeWarrior',
    rank: 'Bronze',
    division: 'I',
    lp: 99,
    role: 'Jungle',
    gamesPlayed: 87,
    wins: 45,
    losses: 42,
    tournamentPoints: calculateTournamentPoints('Bronze', 'I', 99),
  },
];

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

export const getRoleIcon = (role: string): string => {
  const icons: Record<Role, string> = {
    TOP: '⚔️',
    JUNGLE: '🌲',
    MID: '🎯',
    ADC: '🏹',
    SUPPORT: '🛡️',
  };
  return icons[role];
};
