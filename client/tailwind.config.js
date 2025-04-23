/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'weather': {
          100: '#E3F2FD',
          200: '#BBDEFB',
          300: '#90CAF9',
          400: '#64B5F6',
          500: '#42A5F5',
          600: '#2196F3',
          700: '#1E88E5',
          800: '#1976D2',
          900: '#1565C0',
        },
        'glass': {
          'light': 'rgba(255, 255, 255, 0.1)',
          'dark': 'rgba(0, 0, 0, 0.1)',
        }
      },
      backgroundImage: {
        'weather-gradient': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'glass': '8px',
      },
      borderRadius: {
        'weather': '1.5rem',
      },
      fontFamily: {
        'weather': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

