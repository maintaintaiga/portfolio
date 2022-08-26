import { AppBar, Container,Toolbar,Box,IconButton,Tooltip,Avatar,Button } from "@mui/material";
import {Menu,Brightness4,Brightness5} from "@mui/icons-material"

import {useTheme} from "../context/theme"

export const Navigation = () => {
  let { theme, toggleTheme } = useTheme();
  return (
    <Container component="main" disableGutters={true} maxWidth={false}>
      <AppBar>
        <Toolbar>
          <IconButton sx={{display:{xs:"flex",md:"none"}}}><Menu/></IconButton>
            <Avatar src="/favicon-32x32.png" alt="myAvatar"/>
          <Box sx={{flex:1,display:"flex"}}>
              <Button>Home</Button>
              <Button>About</Button>
              <Button>Projects</Button>
              <Button>Contact</Button>
          </Box>
          <Box sx={{flexGrow:0}}>
          <Tooltip title="Toggle light/dark theme">
      <IconButton onClick={toggleTheme}>
       { theme === "dark" ? <Brightness4 /> : <Brightness5 />}
      </IconButton>
    </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};
