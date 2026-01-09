import { Info, TrendingUp } from 'lucide-react';

const PointsExplainer = () => {
  const ranks = [
    { name: 'Iron', divisions: ['IV', 'III', 'II', 'I'], basePoints: 0 },
    { name: 'Bronze', divisions: ['IV', 'III', 'II', 'I'], basePoints: 400 },
    { name: 'Silver', divisions: ['IV', 'III', 'II', 'I'], basePoints: 800 },
    { name: 'Gold', divisions: ['IV', 'III', 'II', 'I'], basePoints: 1200 },
    { name: 'Platinum', divisions: ['IV', 'III', 'II', 'I'], basePoints: 1600 },
    { name: 'Emerald', divisions: ['IV', 'III', 'II', 'I'], basePoints: 2000 },
    { name: 'Diamond', divisions: ['IV', 'III', 'II', 'I'], basePoints: 2400 },
    { name: 'Master', divisions: ['+'], basePoints: 2900 },
    { name: 'Grandmaster', divisions: ['+'], basePoints: 3000 },
    { name: 'Challenger', divisions: ['+'], basePoints: 3100 },
  ];

  return (
    <section className="py-12 md:py-16 bg-muted/10">
      <div className="container m-auto p-6">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Sistema interno de puntos
          </h2>
          <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Explanation */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
                  <Info className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Cómo ganar puntos
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Los puntos del torneo son calculados desde{' '}
                    <span className="text-foreground font-medium">
                      Hierro IV
                    </span>{' '}
                    con una base de (0 puntos). Cada división alcanzada otorga{' '}
                    <span className="text-primary font-medium">100 points</span>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Ejemplo de cálculo
                  </h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <span className="text-rank-gold font-medium">
                        Gold II: 40LP
                      </span>{' '}
                      jugador:
                    </p>
                    <ul className="space-y-1 text-sm pl-4">
                      <li>• Iron (4 divisiones) = 400 pts</li>
                      <li>• Bronze (4 divisiones) = 400 pts</li>
                      <li>• Silver (4 divisiones) = 400 pts</li>
                      <li>• Gold IV → Gold II (2 divisiones) = 200 pts</li>
                      <li>• 40LP de su división = 40 pts</li>
                    </ul>
                    <p className="pt-2 border-t border-border">
                      Total:{' '}
                      <span className="text-primary font-bold">
                        1,440 puntos
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Points Table */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <h3 className="font-semibold text-foreground">
                Puntos de referencia
              </h3>
            </div>
            <div className="max-h-100 overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Elo
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      Puntos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ranks.map((rank) =>
                    rank.divisions.map((div, divIndex) => (
                      <tr
                        key={`${rank.name}-${div}`}
                        className="border-b border-border/30 last:border-0 hover:bg-muted/10"
                      >
                        <td className="px-4 py-2">
                          <span
                            className={`font-medium ${
                              rank.name === 'Iron'
                                ? 'text-rank-iron'
                                : rank.name === 'Bronze'
                                ? 'text-rank-bronze'
                                : rank.name === 'Silver'
                                ? 'text-rank-silver'
                                : rank.name === 'Gold'
                                ? 'text-rank-gold'
                                : rank.name === 'Platinum'
                                ? 'text-rank-platinum'
                                : rank.name === 'Emerald'
                                ? 'text-rank-emerald'
                                : rank.name === 'Diamond'
                                ? 'text-rank-diamond'
                                : rank.name === 'Master'
                                ? 'text-rank-master'
                                : rank.name === 'Grandmaster'
                                ? 'text-rank-grandmaster'
                                : 'text-rank-challenger'
                            }`}
                          >
                            {rank.name} {div !== '+' && div}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-right">
                          <span className="text-foreground font-medium">
                            {(
                              rank.basePoints +
                              divIndex * 100
                            ).toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PointsExplainer;
