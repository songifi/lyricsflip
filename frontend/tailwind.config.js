import { theme } from './styles/theme';
import daisyui from 'daisyui';

export default {
  darkMode: ['class'],
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