import { ShieldAlert, Calendar, Users, Ban } from 'lucide-react';

const rules = [
  {
    icon: Ban,
    title: 'No eloboost',
    description:
      'Todas las partidas deben ser jugadas por el participante registrado. Aumentar la puntuación conlleva la descalificación inmediata.',
  },
  {
    icon: Calendar,
    title: 'Clasificación por miniseasson',
    description:
      'Es obligatorio que juegues en cada miniseasson, si no lo haces serás descalificado. ¡Compite por la gloria en cada miniseasson!',
  },
  {
    icon: Users,
    title: 'DuoQ solo con participantes del torneo',
    description:
      'Solo se puede hacer cola en dúo con otros participantes registrados del torneo. No se permite ayuda externa.',
  },
];

const RulesSection = () => {
  return (
    <section className="py-16 px-4 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/30 mb-4">
            <ShieldAlert className="w-5 h-5 text-destructive" />
            <span className="text-destructive font-semibold">
              Reglas del torneo
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Directrices de juego limpio
          </h2>
          <p className="text-muted-foreground">
            Honra la competencia. Sigue estas reglas para garantizar un torneo
            justo para todos
          </p>
        </div>

        <div className="space-y-4">
          {rules.map((rule, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
            >
              <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                <rule.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg mb-1">
                  {rule.title}
                </h3>
                <p className="text-muted-foreground">{rule.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-lg bg-muted/30 border border-muted text-center">
          <p className="text-sm text-muted-foreground">
            ⚠️ El incumplimiento de cualquier regla podrá resultar en la pérdida
            de puntos o la descalificación, a discreción de los organizadores.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
