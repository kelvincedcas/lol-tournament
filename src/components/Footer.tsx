import { Sword } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container m-auto lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sword className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">
              Camino a la cima{' '}
              <span className="text-gradient-gold">El torneo</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Que tus ganancias de LP sean abundantes y tus compañeros de equipo
            competentes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
