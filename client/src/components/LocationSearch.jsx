import { useState } from 'react';
import { WiDayFog } from 'react-icons/wi';

export default function LocationSearch({ onLocationSelect }) {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchLocation = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSuggestions(data.slice(0, 5));
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (location) => {
    onLocationSelect({
      lat: parseFloat(location.lat),
      lon: parseFloat(location.lon),
      name: location.display_name.split(',').slice(0, 2).join(',')
    });
    setSuggestions([]);
    setSearch('');
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center bg-glass-dark backdrop-blur-glass rounded-xl">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            searchLocation(e.target.value);
          }}
          placeholder="Search location..."
          className="w-full px-4 py-2 bg-transparent text-white placeholder-white/60 outline-none"
        />
        <WiDayFog className="text-2xl text-white/60 mr-4" />
      </div>
      
      {(suggestions.length > 0 || loading) && (
        <div className="absolute w-full mt-2 bg-glass-dark/90 backdrop-blur-md rounded-xl z-10 shadow-xl border border-white/10 overflow-hidden">
          {loading ? (
            <div className="px-4 py-3 text-white/60 text-center">
              Searching...
            </div>
          ) : (
            suggestions.map((place) => (
              <button
                key={place.place_id}
                onClick={() => handleSelect(place)}
                className="w-full px-4 py-3 text-left text-white bg-black/40
                         transition-all duration-200 border-b border-white/10 last:border-none
                         flex items-center space-x-2"
              >
                <WiDayFog className="text-xl text-white/60" />
                <span className="truncate">
                  {place.display_name.split(',').slice(0, 2).join(',')}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
