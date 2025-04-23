import { WiSunrise, WiSunset, WiTime3 } from 'react-icons/wi';
import { useState, useEffect } from 'react';

export default function TimeInfo({ weather, timezone }) {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const time = new Date().toLocaleTimeString('en-US', { timeZone: timezone });
      setLocalTime(time);
    }, 1000);

    return () => clearInterval(timer);
  }, [timezone]);

  const getSunPosition = () => {
    if (!weather?.daily?.sunrise?.[0] || !weather?.daily?.sunset?.[0]) {
      return 50; // Default to middle position if no data
    }

    try {
      const now = new Date();
      const sunrise = new Date(weather.daily.sunrise[0]);
      const sunset = new Date(weather.daily.sunset[0]);
      const progress = (now - sunrise) / (sunset - sunrise) * 100;
      return Math.min(Math.max(progress, 0), 100);
    } catch (error) {
      console.error('Error calculating sun position:', error);
      return 50; // Default to middle position on error
    }
  };

  if (!weather?.daily?.sunrise || !weather?.daily?.sunset) {
    return (
      <div className="bg-glass-dark/30 backdrop-blur-md p-4 rounded-xl">
        <div className="text-2xl text-white font-light">{localTime}</div>
      </div>
    );
  }

  return (
    <div className="bg-glass-dark/30 backdrop-blur-md p-4 rounded-xl space-y-4">
      <div className="text-2xl text-white font-light">{localTime}</div>
      <div className="flex items-center space-x-4 text-white/80">
        <WiSunrise className="text-2xl text-yellow-400" />
        <div className="h-1 flex-1 bg-white/20 rounded-full relative">
          <div 
            className="absolute h-2 w-2 bg-yellow-400 rounded-full top-1/2 -translate-y-1/2"
            style={{ left: `${getSunPosition()}%` }}
          />
        </div>
        <WiSunset className="text-2xl text-orange-400" />
      </div>
    </div>
  );
}
