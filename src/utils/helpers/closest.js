function calculateDistance(coord1, coord2) {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

//Function that gets an array of coordinates and the coordinates of the user, and returns which coordinates are closest to the user coordinates
export function closest(userLocation, coordinatesArray) {
  const coordinates = coordinatesArray.map((coord) => {
    return { id: coord.id, coords: Object.values(coord.location) };
  });

  let minDistance = Infinity;
  let closestCoordinate = null;
  let closestCoordinateId = null;

  for (const { id, coords } of coordinates) {
    const distance = calculateDistance(Object.values(userLocation), coords);
    if (distance < minDistance) {
      minDistance = distance;
      closestCoordinate = coords;
      closestCoordinateId = id;
    }
  }
  return { id: closestCoordinateId, closest: closestCoordinate };
}
