export const getPositionStyle = (pos: number) => {
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
