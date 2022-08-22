import { createContext, useContext } from "react";

export const ThemeContext = createContext(null); //type: AuthCtx | null

export function useTheme() {
  return useContext(ThemeContext);
}
