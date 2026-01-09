import { Trophy, Medal, Star, Crown, Scroll } from 'lucide-react';

const AwardsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            🏆 Recompensas para el campeón
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Solo un invocador puede alzarse con la victoria. El jugador que más
            puntos consiga podrá consagrarse como el mejor jugador del LoL de
            Bahía.
          </p>
        </div>

        {/* Champion Prize Card */}
        <div className="relative p-8 rounded-2xl border-2 border-gold/50 bg-linear-to-br from-gold/10 via-background to-gold/5 backdrop-blur-sm overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-gold/20 blur-3xl rounded-full" />

          <div className="relative text-center mb-8">
            <Crown className="w-16 h-16 text-gold mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-gold mb-2">
              El campeón recibirá
            </h3>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 rounded-xl bg-background/50 border border-gold/20">
              <Medal className="w-10 h-10 text-gold mb-3" />
              <h4 className="font-bold text-foreground">Medalla de honor</h4>
              <p className="text-sm text-muted-foreground text-center">
                Simbolo de la victoria
              </p>
            </div>

            <div className="flex flex-col items-center p-4 rounded-xl bg-background/50 border border-gold/20">
              <Trophy className="w-10 h-10 text-gold mb-3" />
              <h4 className="font-bold text-foreground">Reconocimiento</h4>
              <p className="text-sm text-muted-foreground text-center">
                Mejor jugador de LoL del 2026
              </p>
            </div>

            <div className="flex flex-col items-center p-4 rounded-xl bg-background/50 border border-gold/20">
              <Scroll className="w-10 h-10 text-gold mb-3" />
              <h4 className="font-bold text-foreground">Cuadro de honor</h4>
              <p className="text-sm text-muted-foreground text-center">
                Su nombre en el salón de las legendas
              </p>
            </div>

            <div className="flex flex-col items-center p-4 rounded-xl bg-background/50 border border-gold/20">
              <Star className="w-10 h-10 text-gold mb-3" />
              <h4 className="font-bold text-foreground">Derecho de frontear</h4>
              <p className="text-sm text-muted-foreground text-center">
                Hasta la siguiente seasson
              </p>
            </div>
          </div>

          {/* Grand Prize */}
          <div className="relative mt-8 p-6 rounded-xl border border-gold/30 bg-gold/5 text-center">
            <p className="text-3xl mb-2">🍤🐟🥑🌶️</p>
            <h4 className="text-xl font-bold text-gold mb-2">
              Grand Premio: Ceviche mixto
            </h4>
            <p className="text-muted-foreground">
              La recompensa definitiva: ¡un legendario y suculento ceviche mixto
              cortesía de los perdedores!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
