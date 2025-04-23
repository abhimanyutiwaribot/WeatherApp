import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl } from 'react-leaflet';
import { WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function WeatherMap({ lat, lon, weather }) {
  const [activeLayer, setActiveLayer] = useState('temperature');

  const layers = [
    { id: 'temperature', label: 'Temperature', icon: <WiThermometer /> },
    { id: 'humidity', label: 'Humidity', icon: <WiHumidity /> },
    { id: 'wind', label: 'Wind', icon: <WiStrongWind /> }
  ];

  const getCircleColor = () => {
    const temp = weather.current.temperature_2m;
    if (temp <= 0) return '#00ffff';
    if (temp <= 10) return '#00ff00';
    if (temp <= 20) return '#ffff00';
    if (temp <= 30) return '#ff9900';
    return '#ff0000';
  };

  return (
    <div className="bg-glass-light/30 backdrop-blur-xl rounded-weather space-y-3 p-3 
                    shadow-2xl border border-white/10">
      <div className="flex space-x-2">
        {layers.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveLayer(id)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm
                      transition-all duration-200 ${
              activeLayer === id
                ? 'bg-white/20 text-white'
                : 'bg-glass-dark/30 text-white/60 hover:bg-white/10'
            }`}
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="h-[250px] relative overflow-hidden rounded-lg">
        <MapContainer
          center={[lat, lon]}
          zoom={11}
          zoomControl={false}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
          className="rounded-lg z-0"
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            className="map-tiles"
          />
          
          <Circle
            center={[lat, lon]}
            radius={5000}
            pathOptions={{
              fillColor: getCircleColor(),
              fillOpacity: 0.2,
              color: getCircleColor(),
              weight: 1
            }}
          />

          <Marker position={[lat, lon]}>
            <Popup className="weather-popup">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <WiThermometer className="text-xl text-red-500" />
                  <span>{Math.round(weather.current.temperature_2m)}°C</span>
                </div>
                <div className="flex items-center space-x-2">
                  <WiHumidity className="text-xl text-blue-500" />
                  <span>{weather.current.relative_humidity_2m}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <WiStrongWind className="text-xl text-gray-500" />
                  <span>{Math.round(weather.current.wind_speed_10m)} km/h</span>
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
