const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;

export const getCountry = (lat: number, lng: number): Promise<string> =>
  new Promise(async (resolve) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    resolve(data.results[0].address_components[5].long_name);
  });
