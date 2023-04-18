import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

import Tooltip from "../components/tooltip";
import Header from "../components/header";
import { Carousel } from "../components/carousel";

const includeLink = false;

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
    img: [
      "/screenshots/orchidana-dashboard.png",
      "/screenshots/orchidana-projects.png",
      "/screenshots/orchidana-project-item.png",
      "/screenshots/orchidana-questionnaire-tree-question-item.png",
      "/screenshots/orchidana-assignments.png",
      "/screenshots/orchidana-assignment-filters.png",
      "/screenshots/orchidana-group-permissions.png",
    ],
  },
  {
    name: "Food Explorer",
    link: "https://food-explorer.com",
    description: `Food explorer is a mobile first application utilizing React Native, Expo, React and
      Node.js throughout. A SQLite database is used to store data. The application 
      is deployed onto a public cloud provider. The app is used to search nutrition
      data and make it possible for users to track their nutrients.`,
    img: ["/screenshots/coming-soon.png"],
  },
];

export const Projects = () => {
  return (
    <Stack spacing={4}>
      <Header title="Projects" />
      <Box>
        <Grid container spacing={3} justifyContent="flex-start">
          {exampleProjects.map((el) => (
            <Grid key={el.name} item xs={12} md={6}>
              <Box sx={{ border: 2 }}>
                {el.img && el.img.length > 0 ? (
                  <Carousel images={el.img} />
                ) : null}
                <Box sx={{ p: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {el.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {el.description}
                  </Typography>
                </Box>
                {includeLink ? (
                  <Box sx={{ py: 0 }}>
                    <Tooltip title={`Go to ${el.name}`}>
                      <IconButton edge="start" href={el.link} target="_blank">
                        <LaunchIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : null}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};
