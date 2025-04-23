import { useState, useEffect } from 'react'
import { 
  WiThermometer, 
  WiHumidity, 
  WiStrongWind, 
  WiDaySunny, 
  WiRain, 
  WiCloudy, 
  WiSnow, 
  WiThunderstorm, 
  WiBarometer,
  WiDayCloudyGusts // Use this instead of WiLocationMarker
} from 'react-icons/wi'
import { getWeather, getWeatherDescription } from './services/weatherService'
import { reverseGeocode } from './services/geocodingService'
import AirQuality from './components/AirQuality';
import HistoricalComparison from './components/HistoricalComparison';
import LocationSearch from './components/LocationSearch';
import LoadingSpinner from './components/LoadingSpinner';
import WeatherAlert from './components/WeatherAlert';
import UnitToggle from './components/UnitToggle';
import ThemeToggle from './components/ThemeToggle';
import WeatherMap from './components/WeatherMap';
import Header from './components/Header';
import WeatherChart from './components/WeatherChart';
import FavoriteButton from './components/FavoriteButton';
import FavoritesSidebar from './components/FavoritesSidebar';
import WeatherNotification from './components/WeatherNotification';
import ShareWeather from './components/ShareWeather';
import TimeInfo from './components/TimeInfo';

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [location, setLocation] = useState(null)
  const [locationLoading, setLocationLoading] = useState(true)
  const [locationError, setLocationError] = useState(null)
  const [locationName, setLocationName] = useState(null)
  const [unit, setUnit] = useState('celsius');
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteLocations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const convertTemp = (temp) => {
    if (unit === 'fahrenheit') {
      return (temp * 9/5) + 32;
    }
    return temp;
  };

  const getLocation = () => {
    setLocationLoading(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser")
      setLocationLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
        setLocation(coords)
        try {
          const name = await reverseGeocode(coords.lat, coords.lon)
          setLocationName(name)
        } catch (err) {
          console.error("Error getting location name:", err)
        }
        setLocationLoading(false)
      },
      async (error) => {
        console.error("Error getting location:", error)
        setLocationError("Unable to get your location. Using default location.")
        // Fallback to London coordinates
        const defaultCoords = { lat: 51.5074, lon: -0.1278 }
        setLocation(defaultCoords)
        try {
          const name = await reverseGeocode(defaultCoords.lat, defaultCoords.lon)
          setLocationName(name)
        } catch (err) {
          console.error("Error getting location name:", err)
        }
        setLocationLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) return
      
      try {
        setLoading(true)
        const data = await getWeather(location.lat, location.lon)
        setWeather(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [location])

  const handleLocationSelect = async (selectedLocation) => {
    setLocation({
      lat: selectedLocation.lat,
      lon: selectedLocation.lon
    });
    setLocationName(selectedLocation.name);
  };

  const toggleFavorite = () => {
    if (!location || !locationName) return;
    
    const newFavorites = favorites.some(f => f.lat === location.lat && f.lon === location.lon)
      ? favorites.filter(f => f.lat !== location.lat || f.lon !== location.lon)
      : [...favorites, { ...location, name: locationName }];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteLocations', JSON.stringify(newFavorites));
  };

  const removeFavorite = (location) => {
    const newFavorites = favorites.filter(
      f => f.lat !== location.lat || f.lon !== location.lon
    );
    setFavorites(newFavorites);
    localStorage.setItem('favoriteLocations', JSON.stringify(newFavorites));
  };

  const getWeatherIcon = (code, isNight = false) => {
    if (code <= 3) return <WiDaySunny className={`text-6xl ${isNight ? 'text-blue-200' : 'text-yellow-400'}`} />;
    if (code <= 55) return <WiCloudy className="text-6xl text-gray-400" />;
    if (code <= 65) return <WiRain className="text-6xl text-blue-400 animate-bounce-slow" />;
    if (code <= 77) return <WiSnow className="text-6xl text-white animate-fall-slow" />;
    if (code <= 82) return <WiRain className="text-6xl text-blue-600 animate-bounce-slow" />;
    return <WiThunderstorm className="text-6xl text-yellow-600 animate-pulse" />;
  };

  const formatCoordinate = (coord, type) => {
    const absolute = Math.abs(coord);
    const degrees = Math.floor(absolute);
    const minutes = Math.floor((absolute - degrees) * 60);
    const direction = type === 'lat' 
      ? (coord >= 0 ? 'N' : 'S')
      : (coord >= 0 ? 'E' : 'W');
    return `${degrees}°${minutes}'${direction}`;
  }

  const LocationStatus = () => (
    <div className="text-center mb-4">
      {locationLoading ? (
        <div className="text-white/80">Detecting location...</div>
      ) : locationError ? (
        <div className="flex flex-col items-center justify-center text-weather-200">
          <div className="flex items-center space-x-2">
            <WiDayCloudyGusts className="text-2xl" />
            <span>{locationError}</span>
          </div>
          {locationName && (
            <div className="text-sm mt-1">
              {locationName}
            </div>
          )}
        </div>
      ) : location && (
        <div className="flex flex-col items-center justify-center text-weather-200">
          <div className="flex items-center space-x-2">
            <WiDayCloudyGusts className="text-2xl" />
            <span>{locationName || 'Loading location name...'}</span>
          </div>
        </div>
      )}
    </div>
  )

  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;

  return (
    <div className={`min-h-screen w-full ${isDark ? 
      'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700' : 
      'bg-gradient-to-br from-[#1565C0] via-[#2196F3] to-[#90CAF9]'}
      transition-all duration-1000`}>
      <div className={`min-h-screen w-full transition-opacity duration-1000 
                     ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        <Header 
          isDark={isDark} 
          onThemeToggle={() => setIsDark(!isDark)}
          onLocationSelect={handleLocationSelect}
        />

        <main className="pt-20 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-8 space-y-6">
                {weather && !loading && (
                  <>
                    <div className="flex justify-between items-center">
                      <LocationStatus />
                      <div className="flex items-center space-x-4">
                        <ShareWeather 
                          weather={weather}
                          location={location}
                        />
                        <FavoriteButton 
                          isFavorite={favorites.some(f => f.lat === location?.lat && f.lon === location?.lon)}
                          onClick={toggleFavorite}
                        />
                      </div>
                    </div>

                    <TimeInfo 
                      weather={weather}
                      timezone={weather.timezone}
                    />
                    
                    <div className="bg-glass-light/30 backdrop-blur-xl rounded-weather p-6
                                  shadow-2xl border border-white/10">
                      {/* Current Weather Section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="flex items-center justify-center md:justify-start space-x-6">
                          <div className="transform transition hover:scale-110">
                            {getWeatherIcon(weather.current.weather_code)}
                          </div>
                          <div>
                            <h2 className="text-6xl font-bold text-white mb-2">
                              {Math.round(convertTemp(weather.current.temperature_2m))}°
                            </h2>
                            <p className="text-xl text-white/90 font-medium">
                              {getWeatherDescription(weather.current.weather_code)}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-glass-dark backdrop-blur-glass rounded-xl p-4 
                                       transform transition-all duration-300 hover:bg-glass-light">
                            <div className="flex items-center space-x-3">
                              <WiThermometer className="text-3xl text-weather-200" />
                              <div>
                                <p className="text-sm text-white/60">Feels like</p>
                                <p className="text-xl font-semibold text-white">
                                  {Math.round(convertTemp(weather.current.temperature_2m))}°
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-glass-dark backdrop-blur-glass rounded-xl p-4 
                                       transform transition-all duration-300 hover:bg-glass-light">
                            <div className="flex items-center space-x-3">
                              <WiHumidity className="text-3xl text-weather-200" />
                              <div>
                                <p className="text-sm text-white/60">Humidity</p>
                                <p className="text-xl font-semibold text-white">
                                  {weather.current.relative_humidity_2m}%
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-glass-dark backdrop-blur-glass rounded-xl p-4 
                                       transform transition-all duration-300 hover:bg-glass-light">
                            <div className="flex items-center space-x-3">
                              <WiStrongWind className="text-3xl text-weather-200" />
                              <div>
                                <p className="text-sm text-white/60">Wind</p>
                                <p className="text-xl font-semibold text-white">
                                  {Math.round(weather.current.wind_speed_10m)} km/h
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-glass-dark backdrop-blur-glass rounded-xl p-4 
                                       transform transition-all duration-300 hover:bg-glass-light">
                            <div className="flex items-center space-x-3">
                              <WiBarometer className="text-3xl text-weather-200" />
                              <div>
                                <p className="text-sm text-white/60">Pressure</p>
                                <p className="text-xl font-semibold text-white">
                                  {weather.current.surface_pressure} hPa
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <WeatherChart data={weather} />

                    <WeatherMap 
                      lat={location.lat} 
                      lon={location.lon}
                      weather={weather}
                    />
                    
                    {/* Weekly Forecast */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
                      {weather.daily.time.map((date, index) => (
                        <div key={date} 
                             className="bg-glass-light/20 backdrop-blur-xl rounded-xl p-4 text-center
                                       shadow-lg border border-white/10
                                       transform transition-all duration-300 hover:scale-105
                                       animate-fade-in"
                             style={{ animationDelay: `${index * 100}ms` }}>
                          <p className="text-white/90 font-medium mb-3">
                            {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </p>
                          <div className="mb-3 transform transition hover:scale-110">
                            {getWeatherIcon(weather.daily.weather_code[index])}
                          </div>
                          <div className="flex justify-center items-center space-x-2">
                            <span className="text-lg font-bold text-white">
                              {Math.round(convertTemp(weather.daily.temperature_2m_max[index]))}°
                            </span>
                            <span className="text-sm text-white/60">
                              {Math.round(convertTemp(weather.daily.temperature_2m_min[index]))}°
                            </span>
                          </div>
                          <div className="mt-2 flex items-center justify-center space-x-1">
                            <WiRain className="text-weather-200" />
                            <span className="text-sm text-weather-200">
                              {weather.daily.precipitation_probability_max[index]}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-6">
                <WeatherAlert 
                  temperature={weather?.current.temperature_2m}
                  humidity={weather?.current.relative_humidity_2m}
                  windSpeed={weather?.current.wind_speed_10m}
                />
                
                {weather?.air_quality && (
                  <AirQuality airQuality={weather.air_quality} />
                )}

                {weather?.historical && (
                  <HistoricalComparison 
                    current={weather} 
                    historical={weather.historical} 
                  />
                )}
              </aside>
            </div>
          </div>
        </main>
      </div>
      <FavoritesSidebar 
        favorites={favorites}
        onSelect={handleLocationSelect}
        onRemove={removeFavorite}
      />
      <WeatherNotification weather={weather} />
    </div>
  );
}

export default App;
