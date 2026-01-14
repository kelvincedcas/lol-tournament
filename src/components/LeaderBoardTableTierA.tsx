import {
  getRankColor,
  getRoleIcon,
  type Rank,
  type Role,
} from '@/data/participants.data';
import { useSoloQ } from '@/hooks/useSoloQ';
import type { Player } from '@/interfaces/tournament-stats.response';
import { Crown, Medal, Award } from 'lucide-react';
import type { JSX } from 'react';

export const LeaderboardTableTierA = () => {
  // Sort by tournament points descending
  const { data } = useSoloQ();

  if (!data) return;

  const sortedParticipants = data?.ranking;

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
            <span className="text-gradient-gold">Tier A</span>
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
                  Rol
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
              </tr>
            </thead>
            <tbody>
              {sortedParticipants.map((participant, index) => (
                <tr
                  key={participant.nickname}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4">{getRankBadge(index + 1)}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-foreground">
                      {participant.nickname}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2">
                      <span>{getRoleIcon(participant.role as Role)}</span>
                      <span className="text-muted-foreground">
                        {participant.role}
                      </span>
                    </span>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {sortedParticipants.map((participant, index) => (
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
    <div className="rounded-xl border border-border bg-card p-4 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getRankBadge(position)}
          <div>
            <p className="font-semibold text-foreground">
              {participant.nickname}
            </p>
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
            {participant.tier} {participant.rank || ''}
          </p>
          <p className="text-xs text-muted-foreground">{participant.lp} LP</p>
        </div>
        <div className="p-2 rounded-lg bg-muted/30">
          <p className="font-semibold text-foreground">
            {participant.totalGames}
          </p>
          <p className="text-xs text-muted-foreground">Juegos</p>
        </div>
        <div className="p-2 rounded-lg bg-muted/30">
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
    </div>
  );
};
