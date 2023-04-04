import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

import Tooltip from "../components/tooltip";
import Header from "../components/header";

const exampleProjects = [
  {
    name: "Orchidana",
    link: "https://orchidana.com",
    description: `Orchidana is a full stack application that provides for the management of enterprise security risks and standards.
      It is a secure, multi-tenant, multi-user system that coordinates information gathering and reporting.
      The user interface was developed using the React JavaScript component based framework.
      The server side applications were developed in JavaScript and deployed in the Node.js server runtime environment.
      Data storage was provided by the ArangoDB NOSQL database.
      The web server was provided by NginX which was also used as a reverse proxy for the server applications.
      Visual Studio Code was used as the development environment with a local server stack provided by WinNMP.`,
    img: "/example-project-screenshot.png",
  },
  {
    name: "Food Explorer",
    link: "https://food-explorer.com",
    description: `Food explorer is a mobile first application utilizing react native,expo,react and
      node.js throughout. A sqlite database is used to store data. The application 
      is deployed onto a public cloud provider. The app is used to search nutrition
      data and make it possible for users to track their nutrients.`,
    img: "",
  },
];

export const Projects = () => {
  return (
    <Stack spacing={3}>
      <Header title="Projects" />
      <Box>
        <Grid container spacing={2}>
          {exampleProjects.map((el) => (
            <Grid key={el.name} item xs={12} sm={6} md={4}>
              <Card elevation={0} raised sx={{ border: "2px solid" }}>
                <CardMedia component="img" image={el.img} alt="Coming Soon" />
                <CardContent sx={{ p: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {el.name}
                  </Typography>
                  <Tooltip title={el.description}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display:
                          "-webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;",
                      }}
                    >
                      {el.description}
                    </Typography>
                  </Tooltip>
                </CardContent>
                <CardActions sx={{ py: 0 }}>
                  <Tooltip title={`Go to ${el.name}`}>
                    <IconButton href={el.link} target="_blank">
                      <LaunchIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};
