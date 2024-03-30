//Function that converts an object to an array
export function objectToArray(obj) {
  return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
}
