import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#da2c38",
          neutral: "#FCFCFC",
          accent: "#f4f0bb",
          "base-100": "#EDF2F4", // background
          "base-200": "#FCFCFC", // panel background
          error: "#F87171",
        },
        // dark: {
        //   primary: '#da2c38',
        //   neutral: '#FCFCFC',
        //   accent: '#43291f',
        //   'base-100': '#343B4E',
        //   'base-200': '#2B2D42',
        //   'error': '#A50000',
        // },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
