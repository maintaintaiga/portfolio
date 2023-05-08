import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  AlertColor,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../context/theme";

import NavButton from "./navButton";
import Tooltip from "./tooltip";

const drawerWidth = "80%";
const navItems = [
  { label: "Home", url: "/" },
  { label: "About", url: "about" },
  { label: "Projects", url: "projects" },
  { label: "Contact", url: "contact" },
];
const defaultSnackbarProps: SnackbarPropTypes = {
  open: false,
  severity: "info",
  message: "",
};
type SnackbarPropTypes = {
  open: boolean;
  severity: AlertColor;
  message: string;
};

export const Navigation = (): JSX.Element => {
  const location = useLocation();
  const isCv = location.pathname.indexOf("cv") !== -1;
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState<SnackbarPropTypes>({
    ...defaultSnackbarProps,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const handleClose = (): void => {
    setSnackbarProps((prev) => ({ ...prev, open: false }));
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              to={item.url}
              component={Link}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
              <ChevronRightIcon />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isCv ? (
        <Outlet context={[setSnackbarProps, setIsLoading]} />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            sx={{
              boxShadow: 0,
              bgcolor: (theme) => theme.palette.background.default,
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  display: { sm: "none" },
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "white" : "black",
                }}
              >
                <MenuIcon />
              </IconButton>
              <Box component={Link} to="/" sx={{ flexGrow: 1 }}>
                <Avatar
                  sx={{ width: 50, height: 50 }}
                  alt="img"
                  src="/android-chrome-384x384.png"
                />
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
                {navItems.map((item) => (
                  <NavButton key={item.label} {...item} />
                ))}
              </Box>
              <Tooltip title="Toggle Dark Mode">
                <IconButton
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "white" : "black",
                  }}
                  onClick={toggleTheme}
                >
                  {theme === "light" ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Github Repository">
                <IconButton
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "white" : "black",
                  }}
                  target="_blank"
                  href="https://github.com/maintaintaiga"
                >
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn Profile">
                <IconButton
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "white" : "black",
                  }}
                  target="_blank"
                  href="https://www.linkedin.com/in/kate-ramshaw-8a83babb"
                >
                  <LinkedInIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <Box component="nav">
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
          <Container component="main" sx={{ p: 3, mt: 1 }} maxWidth="md">
            <Toolbar />
            <Outlet context={[setSnackbarProps, setIsLoading]} />
          </Container>
        </Box>
      )}
      <Snackbar
        open={snackbarProps.open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
      >
        <Alert
          severity={snackbarProps.severity}
          variant="filled"
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {snackbarProps.message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
