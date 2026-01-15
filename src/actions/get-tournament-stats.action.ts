// get-tournament-stats.action.ts
import { TournamentApi } from '@/api/lol-tournament.api';
import type { TournamentStatsResponse } from '@/interfaces/tournament-stats.response';

export const getTournamentStatsAction = async (
  refresh = false,
): Promise<TournamentStatsResponse> => {
  const { data } = await TournamentApi.get<TournamentStatsResponse>(
    `/api/tournament-stats${refresh ? '?refresh=true' : ''}`,
  );

  return data;
};
