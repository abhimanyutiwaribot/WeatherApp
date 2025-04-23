import { WiStars } from 'react-icons/wi';

export default function FavoriteButton({ isFavorite, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full transition-all duration-300
                 ${isFavorite 
                   ? 'bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30' 
                   : 'bg-glass-dark/30 text-white/60 hover:bg-white/10'}`}
    >
      <WiStars className="text-2xl" />
    </button>
  );
}
