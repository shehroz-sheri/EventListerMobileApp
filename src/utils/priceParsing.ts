export const renderTicketPrice = (price: number): string => {
  return price <= 0 ? "Free" : `$${price}`;
};
