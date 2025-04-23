import { WiStormWarning } from 'react-icons/wi';

export default function WeatherAlert({ temperature, humidity, windSpeed }) {
  const getAlerts = () => {
    const alerts = [];
    if (temperature > 35) alerts.push('Extreme heat warning');
    if (humidity > 80) alerts.push('High humidity alert');
    if (windSpeed > 50) alerts.push('Strong wind advisory');
    return alerts;
  };

  const alerts = getAlerts();
  
  if (alerts.length === 0) return null;

  return (
    <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-4 border border-red-500/30">
      <div className="flex items-center space-x-2 text-red-200">
        <WiStormWarning className="text-2xl" />
        <div className="font-medium">Weather Alerts</div>
      </div>
      <div className="mt-2 space-y-1">
        {alerts.map((alert, index) => (
          <div key={index} className="text-white/90 text-sm">
            {alert}
          </div>
        ))}
      </div>
    </div>
  );
}
