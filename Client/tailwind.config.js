/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: [
      {
        projectLight: {
          primary: '#da2c38',
          neutral: '#FCFCFC',
          accent: '#f4f0bb',
          'base-100': '#EDF2F4', // background
          'base-200': '#FCFCFC', // panel background
          'error': '#F87171', 
        },
        projectDark: {
          primary: '#da2c38',
          neutral: '#FCFCFC',
          accent: '#43291f',
          'base-100': '#343B4E',
          'base-200': '#2B2D42',
          'error': '#A50000',
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend'],
      },
    },
  },
  plugins: [require('daisyui')],
};
