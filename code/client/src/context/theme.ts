import { createContext, useContext } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void | null;
};

const initialToggle = (): void => {
  return;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: initialToggle,
});

export function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}
