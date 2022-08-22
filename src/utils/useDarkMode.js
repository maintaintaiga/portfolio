import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

export const useDarkMode = () => {
  const [theme, setTheme] = useState("light");
  const [firstRender, setFirstRender] = useState(true);
  const [componentMounted, setComponentMounted] = useState(false);
  let userPreferenceDark = useMediaQuery("(prefers-color-scheme: dark)");

  const setMode = (mode) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme) {
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
