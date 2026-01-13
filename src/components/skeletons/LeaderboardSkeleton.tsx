import { Skeleton } from '@/components/ui/skeleton';

const LeaderboardSkeleton = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container m-auto p-6">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Tabla de clasificación
          </h2>
          <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
        </div>

        {/* Desktop Table Skeleton */}
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
              {Array.from({ length: 8 }).map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-border/50 last:border-0"
                >
                  <td className="px-6 py-4">
                    <Skeleton className="w-8 h-8 rounded-full" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-5 w-28" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-5 h-5" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Skeleton className="h-4 w-8 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Skeleton className="h-5 w-12 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Skeleton className="h-6 w-16 ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards Skeleton */}
        <div className="md:hidden space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <MobilePlayerCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const MobilePlayerCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="text-right space-y-1">
          <Skeleton className="h-6 w-16 ml-auto" />
          <Skeleton className="h-3 w-10 ml-auto" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="p-2 rounded-lg bg-muted/30 flex flex-col items-center gap-1"
          >
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-3 w-10" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardSkeleton;
