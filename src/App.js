import { ThemeProvider, createTheme } from "@mui/material/styles";

import { lightTheme, darkTheme } from "./theme";
import { ThemeContext } from "./context/theme";
import { useDarkMode } from "./utils/useDarkMode";

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  if (!componentMounted) {
    return <div />;
  }

  return (
    <ThemeProvider
      theme={
        theme === "light" ? createTheme(lightTheme) : createTheme(darkTheme)
      }
    >
      <ThemeContext.Provider value={{ theme, toggleTheme: toggleTheme }}>
        <div>
          <img
            src="/android-chrome-192x192.png"
            style={{ width: 200, height: 200, borderRadius: 100 }}
            alt="avatar"
          />
          <h1 style={{ fontFamily: "Trispace, sans-serif" }}>Hello, you</h1>
        </div>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
