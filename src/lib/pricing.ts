export interface BookingParams {
  bedCount: number;
  isFullRoom: boolean;
  days: number;
  isHighSeason: boolean;
}

export const calculatePrice = ({ bedCount, isFullRoom, days, isHighSeason }: BookingParams) => {
  const basePrice = 80; // Preço base médio
  let total = basePrice * bedCount * days;

  // Sazonalidade
  if (isHighSeason) {
    total *= 1.5;
  }

  // Descontos por quantidade
  if (bedCount >= 5 && bedCount < 10) {
    total *= 0.95; // 5% off
  } else if (bedCount >= 10) {
    total *= 0.90; // 10% off
  }

  // Desconto quarto cheio
  if (isFullRoom) {
    total *= 0.85; // 15% off (acumulativo)
  }

  return {
    subtotal: basePrice * bedCount * days,
    total: Math.round(total),
    discount: Math.round((basePrice * bedCount * days) - total)
  };
};
