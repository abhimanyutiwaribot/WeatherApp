import { WiTime9 } from 'react-icons/wi';
import { getTemperatureDifference, formatTemperature } from '../services/weatherService';

export default function HistoricalComparison({ current, historical }) {
  const maxDiff = getTemperatureDifference(
    current.daily.temperature_2m_max[0],
    historical.daily.temperature_2m_max[0]
  );

  const minDiff = getTemperatureDifference(
    current.daily.temperature_2m_min[0],
    historical.daily.temperature_2m_min[0]
  );

  return (
    <div className="bg-glass-light backdrop-blur-glass rounded-weather p-6 shadow-glass">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <WiTime9 className="mr-2" />
        Compared to Last Year
      </h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="text-sm text-white/60">High Temperature</div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold text-white">
                {formatTemperature(current.daily.temperature_2m_max[0])}
              </div>
              <div className="text-sm text-white/60">Today</div>
            </div>
            <div className={`text-lg font-medium ${maxDiff.color}`}>
              {maxDiff.diff}
            </div>
            <div>
              <div className="text-2xl font-bold text-white/80">
                {formatTemperature(historical.daily.temperature_2m_max[0])}
              </div>
              <div className="text-sm text-white/60">Last Year</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-white/60">Low Temperature</div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold text-white">
                {formatTemperature(current.daily.temperature_2m_min[0])}
              </div>
              <div className="text-sm text-white/60">Today</div>
            </div>
            <div className={`text-lg font-medium ${minDiff.color}`}>
              {minDiff.diff}
            </div>
            <div>
              <div className="text-2xl font-bold text-white/80">
                {formatTemperature(historical.daily.temperature_2m_min[0])}
              </div>
              <div className="text-sm text-white/60">Last Year</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
