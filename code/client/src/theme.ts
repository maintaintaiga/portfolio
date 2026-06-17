import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: { default: "#fff9ef" },
    primary: {
      main: "#af42e8",
    },
    secondary: {
      main: "#ff782b",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#212121" },
    primary: {
      main: "#dda446",
    },
  },
});

export { lightTheme, darkTheme };
