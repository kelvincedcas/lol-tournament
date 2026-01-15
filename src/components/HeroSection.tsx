import { Trophy, Users, Target, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSoloQ } from '@/hooks/useSoloQ';
import { Spinner } from './ui/spinner';
import { useQueryClient } from '@tanstack/react-query';
import HeroSectionSkeleton from './skeletons/HeroSectionSkeleton';

const HeroSection = () => {
  const queryClient = useQueryClient();

  const { data, isFetching } = useSoloQ();

  if (!data) {
    return <HeroSectionSkeleton />;
  }

  const ranking = [...data.tierA.ranking, ...data.tierB.ranking];

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background effects */}
      <div className="absolute inset-0 bg-linear-to-b from-muted/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-primary/5 blur-[120px] rounded-full" />

      <div className="container relative z-10 m-auto">
        <div className="flex flex-col items-center text-center p-6 sm:p-0">
          {/* Trophy icon */}
          <div className="mb-6 p-4 rounded-full bg-primary/10 border border-primary/20 glow-gold">
            <Trophy className="w-12 h-12 text-primary animate-pulse-glow" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-gradient-gold">Camino a la cima</span>
            <span className="text-foreground"> El Torneo</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
            Lucha por la gloria en nuestro torneo clasificatorio del League of
            Legends. Asciende en la clasificación, gana puntos y alcanza la
            gloria.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap flex-col justify-center items-center gap-8 md:gap-12 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">
                  {ranking.length}
                </p>
                <p className="text-sm text-muted-foreground">Participantes</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">100</p>
                <p className="text-sm text-muted-foreground">Puntos/División</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-rank-master/20 border border-rank-master/30">
                <Trophy className="w-5 h-5 text-rank-master" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">
                  {ranking[0].tier.slice(0, 1)}
                  {ranking[0].tier.toLocaleLowerCase().slice(1)}
                </p>
                <p className="text-sm text-muted-foreground">Elo más alto</p>
              </div>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="mt-8">
            <Button
              variant={'outline'}
              className="gap-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10"
              onClick={() =>
                queryClient.invalidateQueries({
                  queryKey: ['tournament-stats'],
                  refetchType: 'active',
                })
              }
              disabled={isFetching}
            >
              {isFetching ? (
                <>
                  <Spinner /> Actualizando...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Refrescar estadísticas
                </>
              )}
            </Button>
          </div>
          <p className="mt-5 font-bold">
            Última actualización:{' '}
            <span className="font-normal">
              {new Date(data.updatedAt).toLocaleString('es-EC', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
