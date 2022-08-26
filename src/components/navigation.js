import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import Brightness4 from "@mui/icons-material/Brightness4";
import Brightness5 from "@mui/icons-material/Brightness5";
import Menu from "@mui/icons-material/Menu";

import { useTheme } from "../context/theme";
import Button from "./navButton";

export const Navigation = () => {
  let { theme, toggleTheme } = useTheme();
  return (
    <Container component="main" disableGutters={true} maxWidth={false}>
      <AppBar sx={{ backgroundColor: "transparent" }}>
        <Toolbar>
          <IconButton sx={{ display: { xs: "flex", md: "none" } }}>
            <Menu />
          </IconButton>
          <Avatar src="/favicon-32x32.png" alt="myAvatar" />
          <Box sx={{ flex: 1, display: "flex" }}>
            <Button label="Home" url="/" />
            <Button label="About" url="about" />
            <Button label="Projects" url="projects" />
            <Button label="Contact" url="contact" />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Toggle light/dark theme">
              <IconButton onClick={toggleTheme}>
                {theme === "dark" ? <Brightness4 /> : <Brightness5 />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};
