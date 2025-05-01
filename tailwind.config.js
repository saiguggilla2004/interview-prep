// tailwind.config.mjs

import { animatePlugin } from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // add more folders if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [animatePlugin],
};

export default config;
