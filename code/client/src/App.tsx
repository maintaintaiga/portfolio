import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";

import { lightTheme, darkTheme } from "./theme";
import { ThemeContext } from "./context/theme";
import { useDarkMode } from "./utils/useDarkMode";
import { AppRoutes } from "./routes/app.routes";
import { CssBaseline } from "@mui/material";

function App(): JSX.Element {
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  if (!componentMounted) {
    return <div />;
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <ThemeContext.Provider value={{ theme, toggleTheme: toggleTheme }}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
