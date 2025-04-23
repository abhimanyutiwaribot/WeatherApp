import { WiDaySunny, WiMoonAltWaxingCrescent5 } from 'react-icons/wi';

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 p-2 rounded-full bg-glass-dark/30 backdrop-blur-xl
                 border border-white/10 transition-all duration-300 hover:scale-110"
    >
      {isDark ? 
        <WiDaySunny className="text-2xl text-yellow-400" /> : 
        <WiMoonAltWaxingCrescent5 className="text-2xl text-blue-200" />
      }
    </button>
  );
}
