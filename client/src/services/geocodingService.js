export const reverseGeocode = async (lat, lon) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
  );
  
  if (!response.ok) {
    throw new Error('Failed to get location name');
  }
  
  const data = await response.json();
  return data.display_name.split(',').slice(0, 2).join(',');
};
