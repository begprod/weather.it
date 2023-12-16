/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Comfortaa', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.grid-auto-rows-cards': {
          'grid-auto-rows': '285px',
          '@screen md': {
            'grid-auto-rows': '370px',
          },
          '@screen lg': {
            'grid-auto-rows': '400px',
          },
        },
        '.animation-duration-2000': {
          animationDuration: '2000ms',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
