//Function that asks for the user's location
export async function getUserLocation() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        },
      );
    } else {
      console.error('Geolocation non supportata da questo browser');
      reject(new Error('Geolocation non supportata da questo browser'));
    }
  });
}
