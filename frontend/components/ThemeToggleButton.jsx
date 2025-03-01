
"use client";

import useThemeStore from "@/store/themeStore";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-white dark:bg-whitetext-black dark:text-black border border-red rounded-md"
    >
      Toggle Theme ({theme === "light" ? "Dark" : "Light"})
    </button>
  );
};

export default ThemeToggleButton;
