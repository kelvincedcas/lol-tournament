import AwardsSection from './components/AwardsSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import { LeaderboardTableTierA } from './components/LeaderBoardTableTierA';
import { LeaderboardTableTierB } from './components/LeaderBoardTableTierB';
import PointsExplainer from './components/PointsExplainer';
import RulesSection from './components/RulesSection';
import HeroSectionSkeleton from './components/skeletons/HeroSectionSkeleton';
import { LeaderboardSkeletonTierA } from './components/skeletons/LeaderboardSkeletonTierA';
import { LeaderboardSkeletonTierB } from './components/skeletons/LeaderboardSkeletonTierB';
import { TopPlayersSkeletonTierA } from './components/skeletons/TopPlayersSkeletonTierA';
import { TopPlayersSkeletonTierB } from './components/skeletons/TopPlayersSkeletonTierB';
import { TopPlayersSectionTierA } from './components/TopPlayersSectionTierA';
import { TopPlayersSectionTierB } from './components/TopPlayersSectionTierB';
import { useSoloQ } from './hooks/useSoloQ';

export const LolTournament = () => {
  const { isLoading } = useSoloQ();
  return (
    <div className="min-h-screen bg-background">
      {isLoading ? <HeroSectionSkeleton /> : <HeroSection />}
      {isLoading ? <TopPlayersSkeletonTierA /> : <TopPlayersSectionTierA />}
      {isLoading ? <TopPlayersSkeletonTierB /> : <TopPlayersSectionTierB />}
      {isLoading ? <LeaderboardSkeletonTierA /> : <LeaderboardTableTierA />}
      {isLoading ? <LeaderboardSkeletonTierB /> : <LeaderboardTableTierB />}
      <AwardsSection />
      <RulesSection />
      <PointsExplainer />
      <Footer />
    </div>
  );
};
