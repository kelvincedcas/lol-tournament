import AwardsSection from './components/AwardsSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import LeaderboardTable from './components/LeaderBoardTable';
import PointsExplainer from './components/PointsExplainer';
import RulesSection from './components/RulesSection';
import LeaderboardSkeleton from './components/skeletons/LeaderboardSkeleton';
import TopPlayersSkeleton from './components/skeletons/TopPlayersSkeleton';
import TopPlayersSection from './components/TopPlayersSection';
import { useSoloQ } from './hooks/useSoloQ';

export const LolTournament = () => {
  const { isLoading } = useSoloQ();
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      {isLoading ? <TopPlayersSkeleton /> : <TopPlayersSection />}

      {isLoading ? <LeaderboardSkeleton /> : <LeaderboardTable />}
      <AwardsSection />
      <RulesSection />
      <PointsExplainer />
      <Footer />
    </div>
  );
};
