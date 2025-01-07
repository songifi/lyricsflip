/* eslint-disable import/no-anonymous-default-export */
import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        navbar: '0px 2px 4px rgba(74, 9, 120, 0.2)',
      },
      backgroundImage: {
        'custom-gradient' : 'linear-gradient(90.14deg, #6CCBBE 0.12%, #4A0978 77.9%)'
      },
    },
  },
  plugins: [
    daisyui,
  ],
};
