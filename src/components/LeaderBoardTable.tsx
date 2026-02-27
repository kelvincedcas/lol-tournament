import {
  getRankColor,
  getRoleIcon,
  type Rank,
  type Role,
} from '@/data/participants.data';
import type { Player } from '@/interfaces/tournament-stats.response';
import {
  Crown,
  Medal,
  Award,
  ExternalLink,
  VideoIcon,
  Info,
  Ban,
  Video,
} from 'lucide-react';
import type { JSX } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Badge } from './ui/badge';

interface LeaderboardTableProps {
  players: Player[];
  subtitle: string;
}

export const LeaderboardTable = ({
  players,
  subtitle,
}: LeaderboardTableProps) => {
  const getRankBadge = (position: number) => {
    if (position === 1) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/40">
          <Crown className="w-4 h-4 text-primary" />
        </div>
      );
    }
    if (position === 2) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rank-silver/20 border border-rank-silver/40">
          <Medal className="w-4 h-4 text-rank-silver" />
        </div>
      );
    }
    if (position === 3) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rank-bronze/20 border border-rank-bronze/40">
          <Award className="w-4 h-4 text-rank-bronze" />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
        <span className="text-sm font-medium text-muted-foreground">
          {position}
        </span>
      </div>
    );
  };

  const getWinRateColor = (wins: number, losses: number): string => {
    const total = wins + losses;
    if (total === 0) return 'text-muted-foreground';
    const rate = (wins / total) * 100;
    if (rate >= 55) return 'text-rank-emerald';
    if (rate >= 50) return 'text-foreground';
    return 'text-destructive';
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container m-auto p-6">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Tabla de clasificación{' '}
            <span className="text-gradient-gold">{subtitle}</span>
          </h2>
          <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                  Posición
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                  Jugador
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                  Elo
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                  Juegos
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                  W/L
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                  Win Rate
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-muted-foreground">
                  Puntos
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                  Links
                </th>
              </tr>
            </thead>
            <tbody>
              {players.map((participant, index) => (
                <tr
                  key={participant.nickname}
                  className={`border-b border-border/50 last:border-0 transition-colors animate-slide-up ${
                    participant.disqualified
                      ? 'bg-destructive/5 hover:bg-destructive/10'
                      : 'hover:bg-muted/20'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4">{getRankBadge(index + 1)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`font-semibold ${participant.disqualified ? 'text-destructive line-through' : 'text-foreground'}`}
                      >
                        {participant.nickname}
                      </span>

                      {participant.stream && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={participant.stream}
                              className="text-green-500/60 flex items-center"
                            >
                              <VideoIcon className="size-5" />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>Ver Stream</TooltipContent>
                        </Tooltip>
                      )}
                      {participant.disqualified && (
                        <div className="flex items-center gap-1.5">
                          <Badge
                            variant="destructive"
                            className="text-xs gap-1"
                          >
                            <Ban className="w-3 h-3" />
                            Desc.
                          </Badge>
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                className="text-destructive hover:text-destructive/80 transition-colors"
                                title="View disqualification details"
                              >
                                <Info className="w-4 h-4" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                              <div className="space-y-2">
                                <h4 className="font-semibold text-destructive flex items-center gap-2">
                                  <Ban className="w-4 h-4" />
                                  Descalificado
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  El invocador hizo cola en dúo con otro jugador
                                  con su cuenta secundaria, lo cual incumple
                                  directamente la{' '}
                                  <span className="font-bold">
                                    regla No. 3 establecida en la sección
                                    "Directrices de juego limpio".
                                  </span>
                                </p>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold ${getRankColor(
                        participant.tier as Rank,
                      )}`}
                    >
                      {participant.tier} {participant.rank || ''}
                    </span>
                    <span className="text-muted-foreground ml-2 text-sm">
                      {participant.lp} LP
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-muted-foreground">
                    {participant.totalGames}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-rank-emerald">
                      {participant.wins}W
                    </span>
                    <span className="text-muted-foreground mx-1">/</span>
                    <span className="text-destructive">
                      {participant.losses}L
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`font-semibold ${getWinRateColor(
                        participant.wins,
                        participant.losses,
                      )}`}
                    >
                      {participant.winrate} %
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-xl font-bold text-gradient-gold">
                      {participant.tournamentPoints.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.leagueofgraphs.com/es/summoner/lan/${participant.nickname}-${participant.tag}`}
                      >
                        <Button
                          variant="outline"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-colors text-sm font-medium"
                        >
                          <ExternalLink className="size-4" /> L.O.G.
                        </Button>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {players.map((participant, index) => (
            <MobilePlayerCard
              key={participant.nickname}
              participant={participant}
              position={index + 1}
              getRankBadge={getRankBadge}
              getWinRateColor={getWinRateColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface MobilePlayerCardProps {
  participant: Player;
  position: number;
  getRankBadge: (position: number) => JSX.Element;
  getWinRateColor: (wins: number, losses: number) => string;
}

const MobilePlayerCard = ({
  participant,
  position,
  getRankBadge,
  getWinRateColor,
}: MobilePlayerCardProps) => {
  return (
    <div
      className={`rounded-xl border bg-card p-4 animate-slide-up ${participant.disqualified ? 'border-destructive/50 bg-destructive/5' : 'border-border'}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getRankBadge(position)}
          <div>
            <div className="flex gap-4 items-center">
              <p
                className={`font-semibold ${participant.disqualified ? 'text-destructive line-through' : 'text-foreground'}`}
              >
                {participant.nickname}
              </p>
              {participant.stream && (
                <a
                  href={participant.stream}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                  title="Watch Stream"
                >
                  <Video className="w-4 h-4" />
                </a>
              )}
              {participant.disqualified && (
                <div className="flex items-center gap-1.5">
                  <Badge variant="destructive" className="text-xs gap-1">
                    <Ban className="w-3 h-3" />
                    Desc.
                  </Badge>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="text-destructive hover:text-destructive/80 transition-colors"
                        title="View details"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-destructive flex items-center gap-2">
                          <Ban className="w-4 h-4" />
                          Descalificado
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          El invocador hizo cola en dúo con otro jugador con su
                          cuenta secundaria, lo cual incumple directamente la{' '}
                          <span className="font-bold">
                            regla No. 3 establecida en la sección "Directrices
                            de juego limpio".
                          </span>
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              {getRoleIcon(participant.role as Role)} {participant.role}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-gradient-gold">
            {participant.tournamentPoints.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Puntos</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-2 rounded-lg bg-muted/30">
          <p
            className={`font-semibold ${getRankColor(
              participant.tier as Rank,
            )}`}
          >
            {participant.tier === 'DISQUALIFIED' ? 'DESC.' : participant.tier}{' '}
            {participant.rank || ''}
          </p>
          <p className="text-xs text-muted-foreground">{participant.lp} LP</p>
        </div>
        <div className="p-2 rounded-lg bg-muted/30 flex flex-col justify-center">
          <p className="font-semibold text-foreground">
            {participant.totalGames}
          </p>
          <p className="text-xs text-muted-foreground">Juegos</p>
        </div>
        <div className="p-2 rounded-lg bg-muted/30 flex flex-col justify-center">
          <p
            className={`font-semibold ${getWinRateColor(
              participant.wins,
              participant.losses,
            )}`}
          >
            {participant.winrate} %
          </p>
          <p className="text-xs text-muted-foreground">
            {participant.wins}W / {participant.losses}L
          </p>
        </div>
      </div>
      <div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.leagueofgraphs.com/es/summoner/lan/${participant.nickname}-${participant.tag}`}
        >
          <Button
            variant="outline"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-colors text-sm font-medium"
          >
            <ExternalLink className="size-4" /> Ver en league of Graphs
          </Button>
        </a>
      </div>
    </div>
  );
};
