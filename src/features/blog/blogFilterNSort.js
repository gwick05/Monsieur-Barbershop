export const sortSwitchFn = function (data, sortBy) {
  switch (sortBy) {
    case 'recenti':
      return data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );

    case 'meno-recenti':
      return data.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at),
      );

    default:
      throw new Error('Impossibile ordinare!');
  }
};

export function filterFn(data, filter) {
  return data.filter((piece) => piece.id_autore === +filter);
}
