import { getTournamentStatsAction } from '@/actions/get-tournament-stats.action';
import { useQuery } from '@tanstack/react-query';

export const useSoloQ = () => {
  return useQuery({
    queryKey: ['tournament-stats'],
    queryFn: getTournamentStatsAction,
    staleTime: 1000 * 60 * 5,
  });
};
