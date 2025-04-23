import { useState, useEffect } from 'react';
import { WiStrongWind } from 'react-icons/wi';

export default function WeatherNotification({ weather }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (weather) {
      const temp = weather.current.temperature_2m;
      const wind = weather.current.wind_speed_10m;
      
      if (temp > 30) {
        setMessage('High temperature alert! Stay hydrated.');
        setShow(true);
      } else if (wind > 40) {
        setMessage('Strong winds expected! Take care.');
        setShow(true);
      }
    }
  }, [weather]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-glass-dark/90 backdrop-blur-xl 
                    rounded-lg p-4 text-white shadow-xl border border-white/10
                    animate-fade-in max-w-md">
      <div className="flex items-center space-x-2">
        <WiStrongWind className="text-2xl text-yellow-400" />
        <p>{message}</p>
        <button 
          onClick={() => setShow(false)}
          className="ml-4 text-black/60 hover:text-black"
        >
          ×
        </button>
      </div>
    </div>
  );
}
