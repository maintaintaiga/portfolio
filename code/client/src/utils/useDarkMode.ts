import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

type ThemeContextType = "light" | "dark";

export const useDarkMode = (): [ThemeContextType, () => void, boolean] => {
  const [theme, setTheme] = useState<ThemeContextType>("light");
  const [firstRender, setFirstRender] = useState(true);
  const [componentMounted, setComponentMounted] = useState(false);
  const userPreferenceDark = useMediaQuery("(prefers-color-scheme: dark)");

  const setMode = (mode: ThemeContextType): void => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const toggleTheme = (): void => {
    if (theme === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme === "light" || localTheme === "dark") {
      setTheme(localTheme);
    } else if (userPreferenceDark) {
      setMode("dark");
    }
    setComponentMounted(true);
  }, [userPreferenceDark]);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else {
      if (userPreferenceDark) {
        setMode("dark");
      } else {
        setMode("light");
      }
    }
  }, [userPreferenceDark, firstRender]);

  return [theme, toggleTheme, componentMounted];
};
