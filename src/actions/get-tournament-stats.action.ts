import { TournamentApi } from '@/api/lol-tournament.api';

export const getTournamentStatsAction = async () => {
  const { data } = await TournamentApi.get('/api/tournament-stats');

  console.log({ data });
  return data;
};
