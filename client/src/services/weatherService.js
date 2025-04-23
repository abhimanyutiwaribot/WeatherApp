import axios from 'axios'

const API_URL = import.meta.env.PROD 
  ? 'https://your-backend-domain.onrender.com/api'
  : 'http://localhost:5000/api';

export const getWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `${API_URL}/weather?lat=${latitude}&lon=${longitude}`
    )
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch weather data')
  }
}

export const getWeatherDescription = (code) => {
  const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  
  return weatherCodes[code] || 'Unknown';
}

export const getAQIDescription = (aqi) => {
  if (aqi <= 50) return { text: 'Good', color: 'text-green-400' };
  if (aqi <= 100) return { text: 'Moderate', color: 'text-yellow-400' };
  if (aqi <= 150) return { text: 'Unhealthy for Sensitive Groups', color: 'text-orange-400' };
  if (aqi <= 200) return { text: 'Unhealthy', color: 'text-red-400' };
  if (aqi <= 300) return { text: 'Very Unhealthy', color: 'text-purple-400' };
  return { text: 'Hazardous', color: 'text-red-700' };
}

export const getTemperatureDifference = (current, historical) => {
  const diff = current - historical;
  const sign = diff > 0 ? '+' : '';
  return {
    diff: `${sign}${diff.toFixed(1)}°`,
    color: diff > 0 ? 'text-red-400' : diff < 0 ? 'text-blue-400' : 'text-white'
  };
};

export const formatTemperature = temp => `${Math.round(temp)}°`;
