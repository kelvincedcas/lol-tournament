import AwardsSection from './components/AwardsSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import LeaderboardTable from './components/LeaderBoardTable';
import PointsExplainer from './components/PointsExplainer';
import RulesSection from './components/RulesSection';
import TopPlayersSection from './components/TopPlayersSection';

export const LolTournament = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <TopPlayersSection />
      <LeaderboardTable />
      <AwardsSection />
      <RulesSection />
      <PointsExplainer />
      <Footer />
    </div>
  );
};
