/** @type {import('tailwindcss').Config} */
const plugin       = require('tailwindcss/plugin');

module.exports = {
  // Si vous souhaitez activer le mode sombre, décommentez la ligne suivante :
  // darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* ---------- Polices ---------- */
      fontFamily: {
        sans:    ['var(--font-inter)',    'system-ui',   'sans-serif'],
        serif:   ['var(--font-playfair)', 'Georgia',     'serif'],
        display: ['var(--font-montserrat)','sans-serif'],
        body:    ['var(--font-opensans)', 'sans-serif'],
      },

      /* ---------- Palette personnalisée via CSS Variables + Hex ---------- */
      colors: {
        // Priorité aux variables définies dans globals.css
        primary:    'rgb(var(--color-primary)    / <alpha-value>)',
        secondary:  'rgb(var(--color-secondary)  / <alpha-value>)',
        accent:     'rgb(var(--color-accent)     / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        neutral:    'rgb(var(--color-neutral)    / <alpha-value>)',

        // Palette “warm” héritée
        warm: {
          50:  '#fff9f0',
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
        // Palette “travel” héritée
        travel: {
          sky:    '#87CEEB',
          forest: '#228B22',
          snow:   '#FFFAFA',
          autumn: '#FF6347',
          lake:   '#4682B4',
        },
      },

      /* ---------- Espacements ---------- */
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
      },
      width: {
        128: '32rem',
        144: '36rem',
      },

      /* ---------- Breakpoints ---------- */
      screens: {
        xs:  '475px',
        '3xl':'1600px',
        '4xl':'1920px',
      },

      /* ---------- Effets visuels ---------- */
      boxShadow: {
        card:        '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        'card-hover':'0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)',
        inner:       'inset 0 2px 4px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        xl:  '0.75rem',
        '2xl':'1rem',
        '3xl':'1.5rem',
        '4xl':'2rem',
      },

      /* ---------- Animations ---------- */
      keyframes: {
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { transform: 'translateY(10px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up':'slideUp 0.3s ease-out',
      },

      /* ---------- Images de fond ---------- */
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'quebec-sky':      'linear-gradient(135deg,#87CEEB 0%,#4682B4 100%)',
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),

    // Votre plugin existant pour bg-glass et composants
    plugin(({ addUtilities, addComponents }) => {
      // Utilities
      addUtilities({
        '.bg-glass': {
          background:       'rgba(255,255,255,0.1)',
          backdropFilter:   'blur(10px)',
          border:           '1px solid rgba(255,255,255,0.2)',
        },
      }, ['responsive','hover']);

      // Composants
      addComponents({
        '.btn-primary': {
          '@apply bg-primary hover:bg-accent text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200': {},
        },
        '.card': {
          '@apply bg-background border border-gray-200 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden': {},
        },
        '.hero-section': {
          '@apply min-h-screen bg-quebec-sky flex items-center justify-center text-center px-4': {},
        },
      });
    }),

    // Utilitaires additionnels (text-shadow, backdrop-blur-sm)
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-shadow':      { textShadow: '0 1px 2px rgba(0,0,0,0.2)' },
        '.backdrop-blur-sm': { backdropFilter: 'blur(4px)' },
      }, ['responsive','hover']);
    }),
  ],
};
