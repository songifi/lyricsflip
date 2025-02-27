import { fonts } from "@react-navigation/native/src/theming/fonts";

export const lightTheme = {
  dark: false,
  colors: {
    primary: "#6200ee",
    background: "#ffffff",
    text: "#000000",
    card: "#ffffff",
    border: "#e0e0e0",
    notification: "#ff453a",
  },
  fonts,

  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};

export type ThemeType = typeof lightTheme;

export const darkTheme = {
  dark: true,
  colors: {
    primary: "#bb86fc",
    background: "#121212",
    text: "#ffffff",
    card: "#1c1c1c",
    border: "#272727",
    notification: "#ff453a",
  },
  fonts,
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};
