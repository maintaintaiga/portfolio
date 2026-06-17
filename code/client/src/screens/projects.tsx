import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

import Tooltip from "../components/tooltip";
import Header from "../components/header";
import { Carousel } from "../components/carousel";

import type { JSX } from "react";

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
    logo: "orchidanaLogo.png",
  },
  {
    name: "Messaging App",
    link: "https://message-app.kate-ramshaw.orchidana.com/",
    description:
      "A Next.js redux app, utilising a firebase database to enable realtime messaging.",
    img: ["/screenshots/messaging-app.png"],
    logo: "",
  },
  {
    name: "Movie App",
    link: "https://movie-app-rho-six-45.vercel.app/",
    description:
      "A simple react Next.js app built using only html and css. Made use of TMDB api to generate data.",
    img: ["/screenshots/movie-app.png"],
    logo: "",
  },
  {
    name: "Food Explorer",
    description: `An android app built with React native and expo. Utilises a Sqlite database. `,
    img: ["/screenshots/coming-soon.png"],
    logo: "foodExplorerLogo.png",
  },
];

export const Projects = (): JSX.Element => {
  return (
    <Container maxWidth="sm">
      <Stack spacing={4}>
        <Header title="Projects" />
        <Box>
          <Grid container spacing={8} sx={{
            justifyContent: "flex-start"
          }}>
            {exampleProjects.map((el) => (
              <Grid key={el.name} size={12}>
                <Box>
                  {el.img && el.img.length > 0 ? (
                    <Carousel images={el.img} />
                  ) : null}
                  <Box sx={{ p: 1 }}>
                    <Typography variant="h5" component="div">
                      {el.name}
                    </Typography>
                    <Typography variant="body2" sx={{
                      color: "text.secondary"
                    }}>
                      {el.description}
                    </Typography>
                  </Box>
                  {el?.link ? (
                    <Box sx={{ py: 0, px: 2 }}>
                      <Tooltip title={`Go to ${el.name}`}>
                        <IconButton
                          size="small"
                          edge="start"
                          aria-label={el.link}
                          onClick={(): Window | null =>
                            window.open(el.link, "_blank")
                          }
                        >
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
    </Container>
  );
};
