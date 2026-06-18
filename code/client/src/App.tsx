import { useEffect, type JSX } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";

import { lightTheme, darkTheme } from "./theme";
import { ThemeContext } from "./context/theme";
import { useDarkMode } from "./utils/useDarkMode";
import { Home } from "./screens/home";
import { About } from "./screens/about";
import { Projects } from "./screens/projects";
import { Contact } from "./screens/contact";
import { Navigation } from "./components/navigation";
import { CVDocument } from "./components/cv";
import { CssBaseline } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "projects", element: <Projects /> },
      { path: "contact", element: <Contact /> },
      { path: "cv", element: <CVDocument /> },
    ],
  },
]);

function App(): JSX.Element {
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (!componentMounted) {
    return <div />;
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <ThemeContext.Provider value={{ theme, toggleTheme: toggleTheme }}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
