export default function UnitToggle({ unit, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="bg-glass-dark/50 px-3 py-1 rounded-full text-sm text-white/80 
                hover:bg-glass-dark transition-colors duration-200"
    >
      °{unit === 'celsius' ? 'C' : 'F'}
    </button>
  );
}
