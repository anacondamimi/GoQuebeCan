/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  /* ———————————————————————— Fichiers scannés ———————————————————————— */
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  /* ———————————————————————— Thème principal ———————————————————————— */
  theme: {
    extend: {
      /* ---------- Polices ---------- */
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        display: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-opensans)', 'sans-serif'],
      },

      /* ---------- Palette personnalisée (on conserve le gris natif) ---------- */
      colors: {
        primary: {
          50: '#e3f2ff',
          100: '#b3ddff',
          200: '#80c7ff',
          300: '#4db0ff',
          400: '#1b9aff',
          500: '#0080e6',
          600: '#0065b4',
          700: '#004a82',
          800: '#003050',
          900: '#001620',
        },
        secondary: {
          50: '#ffece6',
          100: '#ffc8b8',
          200: '#ffa48a',
          300: '#ff7f5b',
          400: '#ff5a2d',
          500: '#e64114',
          600: '#b32f0f',
          700: '#801d09',
          800: '#4d0b04',
          900: '#200300',
        },
        warm: {
          50: '#fff9f0',
          100: '#feedd3',
          200: '#fdd0a8',
          300: '#fbb27c',
          400: '#faa551',
          500: '#f79129',
          600: '#d36e1a',
          700: '#9e4e12',
          800: '#6a2e0a',
          900: '#361604',
        },
        /* Palette “travel” additionnelle */
        travel: {
          sky: '#87CEEB',
          forest: '#228B22',
          snow: '#FFFAFA',
          autumn: '#FF6347',
          lake: '#4682B4',
        },
      },

      /* ---------- Spacing / sizing supplémentaires ---------- */
      spacing: {
        18: '4.5rem',
        72: '18rem',
        84: '21rem',
        96: '24rem',
        128: '32rem',
      },
      height: {
        128: '32rem',
        144: '36rem',
        'screen-1/2': '50vh',
        'screen-2/3': '66.666667vh',
        'screen-3/4': '75vh',
      },
      width: {
        128: '32rem',
        144: '36rem',
      },

      /* ---------- Breakpoints personnalisés ---------- */
      screens: {
        xs: '475px',
        '3xl': '1600px',
        '4xl': '1920px',
      },

      /* ---------- Effets visuels ---------- */
      boxShadow: {
        card: '0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06)',
        'card-hover': '0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05)',
        destination: '0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(0,0,0,.06)',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      /* ---------- Animations perso ---------- */
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        bounceGentle: {
          '0%,100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },

      /* ---------- Images de fond ---------- */
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'quebec-sky': 'linear-gradient(135deg,#87CEEB 0%,#4682B4 100%)',
        'autumn-leaves': 'linear-gradient(135deg,#FF6347 0%,#FFD700 100%)',
        'forest-mist': 'linear-gradient(135deg,#228B22 0%,#90EE90 100%)',
      },

      /* ---------- Divers ---------- */
      zIndex: { 60: 60, 70: 70, 80: 80, 90: 90, 100: 100 },
      transitionDuration: { 400: '400ms', 600: '600ms' },
      backdropBlur: { xs: '2px' },
      gridTemplateColumns: {
        'auto-fit-minmax-250': 'repeat(auto-fit,minmax(250px,1fr))',
        'auto-fit-minmax-300': 'repeat(auto-fit,minmax(300px,1fr))',
        'auto-fit-minmax-350': 'repeat(auto-fit,minmax(350px,1fr))',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '5/3': '5 / 3',
        '16/10': '16 / 10',
      },
    },
  },

  /* ———————————————————————— Plugins ———————————————————————— */
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),

    /* ----- Plugin personnalisé “Voyage” ----- */
    plugin(({ addUtilities, addComponents }) => {
      /* Utilitaires */
      addUtilities(
        {
          '.text-balance': { 'text-wrap': 'balance' },
          '.text-pretty': { 'text-wrap': 'pretty' },
          '.bg-glass': {
            background: 'rgba(255,255,255,.1)',
            'backdrop-filter': 'blur(10px)',
            border: '1px solid rgba(255,255,255,.2)',
          },
          '.bg-glass-dark': {
            background: 'rgba(0,0,0,.1)',
            'backdrop-filter': 'blur(10px)',
            border: '1px solid rgba(255,255,255,.1)',
          },
        },
        ['responsive', 'hover']
      );

      /* Composants */
      addComponents({
        '.destination-card': {
          '@apply bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden':
            {},
        },
        '.hero-section': {
          '@apply min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center':
            {},
        },
        '.section-padding': { '@apply py-16 px-4 sm:px-6 lg:px-8': {} },
        '.container-custom': { '@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8': {} },
        '.btn-primary': {
          '@apply bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2':
            {},
        },
        '.btn-secondary': {
          '@apply bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2':
            {},
        },
        '.input-field': {
          '@apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500':
            {},
        },
      });
    }),
  ],
};
