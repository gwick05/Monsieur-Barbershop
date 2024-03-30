export function sortSwitchFn(data, sortBy) {
  switch (sortBy) {
    case 'recenti':
      return data.sort((a, b) => new Date(b.data) - new Date(a.data));

    case 'meno-recenti':
      return data.sort((a, b) => new Date(a.data) - new Date(b.data));

    default:
      throw new Error('Impossibile ordinare!');
  }
}

export function filterFn(data, filter) {
  return data.filter((piece) => piece.id_sede === +filter);
}
