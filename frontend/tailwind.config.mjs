/* eslint-disable import/no-anonymous-default-export */
import daisyui from "daisyui";
import { Geist } from "next/font/google";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        InterV: ["Inter-V", "sans-serif"],
        Geist: ["Geist", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        error: "var(--error)",
        accent: "var(--accent)",
        inactive: "var(--inactive)",
      },
      boxShadow: {
        navbar: "0px 2px 4px rgba(74, 9, 120, 0.2)",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90.14deg, #6CCBBE 0.12%, #4A0978 77.9%)",
        "custom-gradient-invert":
          "linear-gradient(90.14deg, #4A0978 77.9%, #6CCBBE 0.12%)",
      },
      animation: {
        customBounce: "bounce 4s infinite",
        slowPulse: "pulse 3s infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [daisyui, require("tailwindcss-animate")],
};
