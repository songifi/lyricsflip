import { theme } from './styles/theme';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables dark mode with 'class'
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: theme.colors,
      fontFamily: theme.fonts,
      boxShadow: theme.boxShadow,
      backgroundImage: theme.backgroundImage,
      borderRadius: theme.borderRadius,
    },
  },
  plugins: [daisyui, require('tailwindcss-animate')],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables class-based dark mode switching
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
