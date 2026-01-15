import {
  getRankColor,
  getRoleIcon,
  type Rank,
  type Role,
} from '@/data/participants.data';
import { useSoloQ } from '@/hooks/useSoloQ';
import type { Player } from '@/interfaces/tournament-stats.response';
import {
  Trophy,
  Flame,
  Sword,
  ChartBar,
  ExternalLink,
  VideoIcon,
} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from './ui/button';

export const TopPlayersSectionTierA = () => {
  const { data } = useSoloQ();

  if (!data) return;

  const topPlayers = data?.tierA.ranking.slice(0, 6);

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
            Top 6 jugadores <span className="text-gradient-gold">Tier A</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Los jugadores con más elo que compliten por alcanzar la cima
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topPlayers.map((player, index) => (
            <PlayerCard
              key={player.nickname}
              player={player}
              position={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface PlayerCardProps {
  player: Player;
  position: number;
}

const PlayerCard = ({ player, position }: PlayerCardProps) => {
  const winRate = player.winrate;
  const rankColor = getRankColor(player.tier as Rank);
  const roleIcon = getRoleIcon(player.role as Role);

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

  const getWinRateColor = (wins: number, losses: number): string => {
    const total = wins + losses;
    if (total === 0) return 'text-muted-foreground';
    const rate = (wins / total) * 100;
    if (rate >= 55) return 'text-rank-emerald';
    if (rate >= 50) return 'text-foreground';
    return 'text-destructive';
  };

  const getPositionBadge = (pos: number) => {
    switch (pos) {
      case 1:
        return (
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-linear-to-br from-gold to-gold-dark rounded-full flex items-center justify-center shadow-lg shadow-gold/30">
            <Trophy className="w-5 h-5 text-background" />
          </div>
        );
      case 2:
        return (
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-linear-to-br from-rank-silver to-gray-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-background font-bold text-sm">2</span>
          </div>
        );
      case 3:
        return (
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-linear-to-br from-rank-bronze to-amber-800 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-background font-bold text-sm">3</span>
          </div>
        );
      default:
        return (
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <span className="text-muted-foreground font-semibold text-sm">
              {pos}
            </span>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative p-6 rounded-xl border bg-linear-to-br ${getPositionStyle(
        position,
      )} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      {getPositionBadge(position)}

      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-lg bg-background/50 flex items-center justify-center text-2xl border border-border/50">
          {roleIcon}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-foreground mb-1">
              {player.nickname}
            </h3>
            {player.stream && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={player.stream}
                    className="text-green-500/60 flex items-center -mt-1"
                  >
                    <VideoIcon className="size-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Ver Stream</TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className={`text-sm font-semibold ${rankColor}`}>
            {player.tier} {player.rank} • {player.lp} LP
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {player.role}
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-border/50">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">
              {player.totalGames}
            </div>
            <div className="text-xs text-muted-foreground">Juegos</div>
          </div>
          <div>
            <div
              className={`text-lg font-bold ${getWinRateColor(
                player.wins,
                player.losses,
              )}`}
            >
              {winRate}%
            </div>
            <div className="text-xs text-muted-foreground">Win Rate</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gold">
              {player.tournamentPoints}
            </div>
            <div className="text-xs text-muted-foreground">Puntos</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          <span className="text-green-400">{player.wins}W</span>
          {' / '}
          <span className="text-red-400">{player.losses}L</span>
        </span>
        <div className="flex items-center gap-1 text-gold/80">
          <Sword className="w-3 h-3" />
          <span>#{position} Ranked</span>
        </div>
      </div>
      <div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={player.stream}
          className="flex"
        >
          <Button
            variant="outline"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-colors text-sm font-medium"
          >
            <ExternalLink className="size-4" /> Ver en OP.GG
          </Button>
        </a>
      </div>
    </div>
  );
};
