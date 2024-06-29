/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      height: {
        '10vh': '10vh',
        '50vh': '50vh',
      },
      screens: {
        'xs': '320px',
        // => @media (min-width: 320) { ... }

        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        khaki: {
          DEFAULT: '#F0E68C',
          '50': '#FEFEF8',
          '100': '#FBFBEF',
          '200': '#F5F3D9',
          '300': '#EFECB8',
          '400': '#E8E48D',
          '500': '#F0E68C', // основной цвет khaki
          '600': '#E0D672',
          '700': '#C5BB60',
          '800': '#A09A52',
          '900': '#837E44',
        },
        customGreen: '#7ECA1D',
        lightGreen: '#f3f8ed'
      },
    },
  },
  plugins: [],
};
