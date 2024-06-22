/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        khaki: {
          DEFAULT: '#F0E68C',
          '50': '#FEFEF8',
          '100': '#FBFBEF',
          '200': '#F5F3D9',
          '300': '#EFECB8',
          '400': '#E8E48D',
          '500': '#F0E68C', // main khaki color
          '600': '#E0D672',
          '700': '#C5BB60',
          '800': '#A09A52',
          '900': '#837E44',
        },
      },
    },
  },
  plugins: [],
}
