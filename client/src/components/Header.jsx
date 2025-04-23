import { WiDaySunny } from 'react-icons/wi';
import LocationSearch from './LocationSearch';
import ThemeToggle from './ThemeToggle';

export default function Header({ isDark, onThemeToggle, onLocationSelect }) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 
                     ${isDark ? 'bg-gray-900/90' : 'bg-[#1565C0]/90'}
                     backdrop-blur-md border-b border-white/10`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <WiDaySunny className="text-5xl text-yellow-400" />
              <span className="text-3xl font-bold text-white">WeatherApp</span>
            </div>
            {/* <nav className="hidden md:flex space-x-6">
              <button className="text-white/80 hover:text-white">Today</button>
              <button className="text-white/80 hover:text-white">Hourly</button>
              <button className="text-white/80 hover:text-white">10 Day</button>
              <button className="text-white/80 hover:text-white">Radar</button>
            </nav> */}
          </div>
          <div className="flex items-center space-x-4">
            <LocationSearch onLocationSelect={onLocationSelect} />
            <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
          </div>
        </div>
      </div>
    </header>
  );
}
