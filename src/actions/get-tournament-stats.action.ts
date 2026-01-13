import { TournamentApi } from '@/api/lol-tournament.api';
import type { TournamentStatsResponse } from '@/interfaces/tournament-stats.response';

export const getTournamentStatsAction = async () => {
  const { data } = await TournamentApi.get<TournamentStatsResponse>(
    '/api/tournament-stats',
  );

  // console.log({ data });
  return data;
};
