export function findItemWithMostOccurrences(arrOcc, arrItems, searchBy) {
  const occurances = new Map();
  for (const item of arrItems) {
    occurances.set(item.id, 0);
  }

  for (const occ of arrOcc) {
    occurances.set(occ[searchBy], occurances.get(occ[searchBy]) + 1);
  }
  let maxValue = null;
  const idWithMostOccurences = Array.from(occurances).reduce((acc, curr) => {
    if (curr[1] > maxValue) {
      maxValue = curr[1];
      return curr[0];
    } else {
      return acc;
    }
  }, null);

  return {
    itemWithMostOccurences: arrItems.find(
      (item) => item.id === idWithMostOccurences,
    ),
    occurances,
  };
}
