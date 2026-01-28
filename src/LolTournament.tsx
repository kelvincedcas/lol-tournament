import AwardsSection from './components/AwardsSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import { LeaderboardTable } from './components/LeaderBoardTable';
import PointsExplainer from './components/PointsExplainer';
import RulesSection from './components/RulesSection';
import HeroSectionSkeleton from './components/skeletons/HeroSectionSkeleton';
import { LeaderboardSkeleton } from './components/skeletons/LeaderboardSkeleton.tsx';
import { TopPlayersSkeleton } from './components/skeletons/TopPlayersSkeleton.tsx';
import { TopPlayersSection } from './components/TopPlayersSection.tsx';
import { useSoloQ } from './hooks/useSoloQ';

export const LolTournament = () => {
  const { data, isLoading } = useSoloQ();

  const tiers = [
    {
      key: 'tierA',
      label: 'Tier A',
      players: data?.tierA.ranking,
    },
    {
      key: 'tierB',
      label: 'Tier B',
      players: data?.tierB.ranking,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {isLoading ? <HeroSectionSkeleton /> : <HeroSection />}
      {tiers.map((tier) =>
        isLoading ? (
          <TopPlayersSkeleton key={tier.key} subtitle={tier.label} />
        ) : (
          <TopPlayersSection
            key={tier.key}
            players={tier.players || []}
            subtitle={tier.label}
          />
        ),
      )}

      {tiers.map((tier) =>
        isLoading ? (
          <LeaderboardSkeleton key={tier.key} subtitle={tier.label} />
        ) : (
          <LeaderboardTable
            key={tier.key}
            subtitle={tier.label}
            players={tier.players || []}
          />
        ),
      )}
      <AwardsSection />
      <RulesSection />
      <PointsExplainer />
      <Footer />
    </div>
  );
};
