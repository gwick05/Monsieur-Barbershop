export function sortSwitchFn(data, sortBy) {
  switch (sortBy) {
    case 'recenti':
      return data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
    case 'meno-recenti':
      return data.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at),
      );
    case 'piu-costosi':
      return data.sort((a, b) => b.price - a.price);
    case 'meno-costosi':
      return data.sort((a, b) => a.price - b.price);
    default:
      throw new Error('Impossibile ordinare!');
  }
}
export function filterFn(data, filter) {
  if (filter === 'in-offerta')
    return data.filter((prodotto) => prodotto.discount);
  if (filter === 'non-offerta')
    return data.filter((prodotto) => !prodotto.discount);
}
