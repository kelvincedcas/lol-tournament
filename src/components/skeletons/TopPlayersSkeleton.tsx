import { Skeleton } from '@/components/ui/skeleton';
import { Flame } from 'lucide-react';

interface Props {
  subtitle: string;
}

export const TopPlayersSkeleton = ({ subtitle }: Props) => {
  return (
    <section className="py-16 px-4 bg-linear-to-b from-background to-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-gold mb-4">
            <Flame className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Jugadores de élite
            </span>
            <Flame className="w-5 h-5" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Top 6 jugadores{' '}
            <span className="text-gradient-gold">{subtitle}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Los jugadores con más elo que compliten por alcanzar la cima
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <PlayerCardSkeleton key={index} position={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PlayerCardSkeleton = ({ position }: { position: number }) => {
  const getPositionStyle = (pos: number) => {
    switch (pos) {
      case 1:
        return 'from-gold/20 to-gold/5 border-gold/50 shadow-gold/20';
      case 2:
        return 'from-rank-silver/20 to-rank-silver/5 border-rank-silver/50 shadow-rank-silver/20';
      case 3:
        return 'from-rank-bronze/20 to-rank-bronze/5 border-rank-bronze/50 shadow-rank-bronze/20';
      default:
        return 'from-card to-card/80 border-border';
    }
  };

  return (
    <div
      className={`relative p-6 rounded-xl border bg-linear-to-br ${getPositionStyle(
        position,
      )} backdrop-blur-sm`}
    >
      <div className="absolute -top-2 -right-2">
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>

      <div className="flex items-start gap-4">
        <Skeleton className="w-14 h-14 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-border/50">
        <div className="grid grid-cols-3 gap-3 text-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <Skeleton className="h-5 w-10" />
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
};
