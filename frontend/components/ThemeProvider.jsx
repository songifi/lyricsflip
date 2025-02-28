
"use client";

import { useEffect } from "react";
import useThemeStore from "@/store/themeStore";

const ThemeProvider = ({ children }) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Remove any previous theme classes and add the new one to the <html> element.
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
