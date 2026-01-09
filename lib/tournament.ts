/* =========================
   ELO → PUNTOS INTERNOS
========================= */

const TIER_BASE: Record<string, number> = {
  IRON: 0,
  BRONZE: 400,
  SILVER: 800,
  GOLD: 1200,
  PLATINUM: 1600,
  EMERALD: 2000,
  DIAMOND: 2400,
  MASTER: 2800,
  GRANDMASTER: 3000,
  CHALLENGER: 3200,
};

const RANK_OFFSET: Record<string, number> = {
  IV: 0,
  III: 100,
  II: 200,
  I: 300,
};

export function calculateTournamentPoints(
  tier: string,
  rank: string,
  lp: number,
) {
  return TIER_BASE[tier] + RANK_OFFSET[rank] + lp;
}

export function buildRanking(players: any[]) {
  const sorted = [...players].sort(
    (a, b) => b.tournamentPoints - a.tournamentPoints,
  );

  return sorted.map((p, index) => ({
    position: index + 1,
    ...p,
  }));
}

export function calculateMVP(ranking: any[]) {
  return ranking.length > 0 ? ranking[0] : null;
}
