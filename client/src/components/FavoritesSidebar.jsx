import { WiDayCloudyGusts } from 'react-icons/wi';

export default function FavoritesSidebar({ favorites, onSelect, onRemove }) {
  return (
    <div className="fixed right-0 top-20 h-screen backdrop-blur-md p-4 
                    border-l border-white/10 w-100 transform transition-transform duration-300
                    hover:translate-x-0 translate-x-72">
      <h3 className="text-white font-semibold mb-4">Favorite Locations</h3>
      <div className="space-y-2">
        {favorites.map((location) => (
          <div key={`${location.lat}-${location.lon}`}
               className="flex items-center justify-between hover:bg-white/5
                        rounded-lg p-2 group transition-colors">
            <button
              onClick={() => onSelect(location)}
              className="flex items-center space-x--7 text-black/80 hover:text-black"
            >
              <WiDayCloudyGusts className="text-white/80" />
              <span className="text-sm truncate">{location.name}</span>
            </button>
            <button
              onClick={() => onRemove(location)}
              className="opacity-0 group-hover:opacity-100 text-white/60 
                       hover:text-red-400 transition-opacity text-sm"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
