//Simple function that takes an array of object and filters out the duplicate objects
export function filterIdenticalObjects(array) {
  return array.filter((obj, index) => {
    for (let i = 0; i < index; i++) {
      if (JSON.stringify(obj) === JSON.stringify(array[i])) {
        return false;
      }
    }
    return true;
  });
}
