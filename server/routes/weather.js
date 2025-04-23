import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    // Fetch current weather and forecast
    const weatherResponse = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code,pressure_msl&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
    );

    // Fetch air quality data
    const airQualityResponse = await axios.get(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm10,pm2_5,nitrogen_dioxide,ozone`
    );

    // Get historical data for comparison (last year)
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const historicalResponse = await axios.get(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${lastYear.toISOString().split('T')[0]}&end_date=${lastYear.toISOString().split('T')[0]}&daily=temperature_2m_max,temperature_2m_min`
    );

    // Combine all data
    const combinedData = {
      ...weatherResponse.data,
      air_quality: airQualityResponse.data,
      historical: historicalResponse.data
    };

    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

export default router;
