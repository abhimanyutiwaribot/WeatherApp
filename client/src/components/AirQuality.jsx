import { WiDust } from 'react-icons/wi';
import { getAQIDescription } from '../services/weatherService';

export default function AirQuality({ airQuality }) {
  const aqiInfo = getAQIDescription(airQuality.current.us_aqi);

  return (
    <div className="bg-glass-light backdrop-blur-glass rounded-weather p-6 shadow-glass">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <WiDust className="mr-2" /> Air Quality
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className={`text-center ${aqiInfo.color}`}>
          <div className="text-3xl font-bold">{airQuality.current.us_aqi}</div>
          <div className="text-sm">{aqiInfo.text}</div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-white/80">
            <div>PM2.5</div>
            <div>{airQuality.current.pm2_5}µg/m³</div>
          </div>
          <div className="text-white/80">
            <div>PM10</div>
            <div>{airQuality.current.pm10}µg/m³</div>
          </div>
        </div>
      </div>
    </div>
  );
}
