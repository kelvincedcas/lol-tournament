import {
  participants,
  getRankColor,
  getRoleIcon,
  type Participant,
} from '@/data/participants.data';
import { Crown, Medal, Award } from 'lucide-react';
import type { JSX } from 'react';

const LeaderboardTable = () => {
  // Sort by tournament points descending
  const sortedParticipants = [...participants].sort(
    (a, b) => b.tournamentPoints - a.tournamentPoints,
  );

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

  const getWinRate = (wins: number, losses: number): string => {
    const total = wins + losses;
    if (total === 0) return '0%';
    return `${Math.round((wins / total) * 100)}%`;
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
            Tabla de clasificación
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
                  key={participant.id}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4">{getRankBadge(index + 1)}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-foreground">
                      {participant.summonerName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2">
                      <span>{getRoleIcon(participant.role)}</span>
                      <span className="text-muted-foreground">
                        {participant.role}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold ${getRankColor(
                        participant.rank,
                      )}`}
                    >
                      {participant.rank} {participant.division || ''}
                    </span>
                    <span className="text-muted-foreground ml-2 text-sm">
                      {participant.lp} LP
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-muted-foreground">
                    {participant.gamesPlayed}
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
                      {getWinRate(participant.wins, participant.losses)}
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
              key={participant.id}
              participant={participant}
              position={index + 1}
              getRankBadge={getRankBadge}
              getWinRate={getWinRate}
              getWinRateColor={getWinRateColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface MobilePlayerCardProps {
  participant: Participant;
  position: number;
  getRankBadge: (position: number) => JSX.Element;
  getWinRate: (wins: number, losses: number) => string;
  getWinRateColor: (wins: number, losses: number) => string;
}

const MobilePlayerCard = ({
  participant,
  position,
  getRankBadge,
  getWinRate,
  getWinRateColor,
}: MobilePlayerCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-4 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getRankBadge(position)}
          <div>
            <p className="font-semibold text-foreground">
              {participant.summonerName}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              {getRoleIcon(participant.role)} {participant.role}
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
          <p className={`font-semibold ${getRankColor(participant.rank)}`}>
            {participant.rank} {participant.division || ''}
          </p>
          <p className="text-xs text-muted-foreground">{participant.lp} LP</p>
        </div>
        <div className="p-2 rounded-lg bg-muted/30">
          <p className="font-semibold text-foreground">
            {participant.gamesPlayed}
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
            {getWinRate(participant.wins, participant.losses)}
          </p>
          <p className="text-xs text-muted-foreground">
            {participant.wins}W / {participant.losses}L
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTable;
