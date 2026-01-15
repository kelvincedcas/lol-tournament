// useSoloQ.ts
import { useQuery } from '@tanstack/react-query';
import { getTournamentStatsAction } from '@/actions/get-tournament-stats.action';

export const useSoloQ = () => {
  return useQuery({
    queryKey: ['tournament-stats'],
    queryFn: () => getTournamentStatsAction(false),
    staleTime: 1000 * 60 * 5,
  });
};
