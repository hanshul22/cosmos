/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0B0D17',
          accent: '#7B89E4',
          nebula: '#FF6B6B',
          star: '#FFD93D',
          planet: '#64FFDA'
        }
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
      },
      animation: {
        'float': 'float 10s infinite',
        'twinkle': 'twinkle 1s infinite alternate',
        'rotate': 'rotate 20s infinite linear'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, 20px)' }
        },
        twinkle: {
          '0%': { opacity: '0.3' },
          '100%': { opacity: '1' }
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    }
  },
  plugins: []
}