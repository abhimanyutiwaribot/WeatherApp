import { WiTime9 } from 'react-icons/wi';

export default function ShareWeather({ weather, location, onShare }) {
  const handleShare = async () => {
    const text = `Current weather in ${location.name}:
Temperature: ${Math.round(weather.current.temperature_2m)}°C
Conditions: ${weather.current.weather_code}
Humidity: ${weather.current.relative_humidity_2m}%`;

    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="bg-glass-dark/30 backdrop-blur-md px-4 py-2 rounded-full
                text-white/80 hover:text-white flex items-center space-x-2
                transition-all duration-300 hover:bg-white/10"
    >
      <WiTime9 className="text-xl" />
      <span>Share Weather</span>
    </button>
  );
}
