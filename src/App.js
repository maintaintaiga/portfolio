import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";

import { lightTheme, darkTheme } from "./theme";
import { ThemeContext } from "./context/theme";
import { useDarkMode } from "./utils/useDarkMode";
import { AppRoutes } from "./routes/app.routes";

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
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
