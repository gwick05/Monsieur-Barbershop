/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    fontFamily: {
      sans: 'Roboto, sans-serif',
    },
    extend: {
      height: {
        53: '13.25rem',
        54: '13.5rem',
        68: '17.5rem',
        '2/8': '13%',
        '6/8': '87%',
      },
      width: {
        '1/7': '14%',
        '6/7': '86%',
      },
      spacing: {
        30: '7.5rem', // Equivalent to 120px
      },
    },
  },
  plugins: [],
};
